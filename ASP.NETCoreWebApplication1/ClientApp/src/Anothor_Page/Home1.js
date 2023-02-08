import {Container, Navbar, Col, Row,Modal} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import useInterval from 'use-interval'
import '../App.css';
import apple2 from '../image/apple2.jpg'
import ImgCrop from 'antd-img-crop';
import { SearchOutlined,AudioOutlined ,LoadingOutlined, PlusOutlined,InboxOutlined ,ArrowRightOutlined} from '@ant-design/icons';
import {  Button, Tooltip, Space  ,Input,message, Upload,Card,Radio,Spin} from "antd"
import p1 from '../image/Home1_img.jpg'
import Pngtree from '../image/Pngtree.png'

// import Texty from 'rc-texty';
// import 'rc-texty/assets/index.css';
// import MealList from './MealLIst'
// const { Search } = Input;
//
// const onSearch = (value) => console.log(value);

/*const { Dragger } = Upload;
 const props = {
     name: 'file',
     multiple: true,
     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
         const { status } = info.file;
         if (status !== 'uploading') {
             console.log(info.file, info.fileList);
         }
         if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
         } else if (status === 'error') {
             message.error(`${info.file.name} file upload failed.`);
         }
     },
     onDrop(e) {
         console.log('Dropped files', e.dataTransfer.files);
     },
 };*/
function Home1(props){
    const [getdata,setGetdata]=useState();
    const [ingredients,setIngredients]=useState()
    const[number,setNumber]=useState(5)
    const [recipe,setRecipe]=useState([])
    // const [id,setId]=useState(null)
    const [cook_method,setCook_method]=useState([])
    const [show, setShow] = useState(false);
    const [url,setUrl]=useState()
    const [random,setRandom]=useState(10000)
    const [randomcard,setRandomCard]=useState()
    const [isloading,setLoading]=useState(true)
    const [step_equipment,set_Step_Equipment]=useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fileList, setFileList] = useState([
       /* {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: '',
        },*/
    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    useEffect(()=>{recipemessage()},[])
    useEffect(()=>{getrecipe()},[])
    /*useEffect(()=>{populateWeatherData(),[]})*/
    // useInterval(() => {
    //     setRandom(Math.floor(Math.random() * 10000));
    //     console.log(random)
    //     console.count()
    //     random_recipe_card()
    // },10000);
    const API_KEY=props.API_KEY
    const { Meta } = Card;

    const [loadings, setLoadings] = useState([]);
    // loading delay
    const enterLoading = (index) => {
        getrecipe();
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 500);
    };
    async function populateWeatherData(){
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setGetdata(fileList);
        console.log(fileList)
    }

    // 輸入食材
    function handlechange(e){
        setIngredients(e.target.value)
    }
    // 輸入數字
    function handlechange2(e){
        setNumber(e.target.value);
    }
    // 輸入材料ID得到API的食譜數據
    async function recipemessage(recipeid){
        let Message=await fetch(`https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${API_KEY}&includeNutrition=false`)
        console.log(Message)
        let jsonMessage=await Message.json();
        console.log(jsonMessage)
        let extendedIngredients=await jsonMessage.extendedIngredients
        console.log(extendedIngredients)
        const cook_methods=await Promise.all(extendedIngredients.map(async(j)=>{
            const Cook_method={
                aisle:j.aisle.toString(),
                amount:j.amount.toString(),
                consistency:j.consistency.toString(),
                id:j.id,
                image:j.image,
                name:j.name,
                nameClean:j.nameClean.toString(),
                original:j.original.toString(),
                originalName:j.originalName.toString(),
                unit:j.unit
            }
            return Cook_method
        }))
        setCook_method(cook_methods.filter(Cook_method => Cook_method !== null))
        setLoading(false)
    }

    // 將相關食物Map出來
    function RecipeMessage(){
        return(
            <div>
                <Modal.Title>所需材料</Modal.Title>
                <hr/>
                {
                    cook_method.map((Cook_method,j)=>(

                        <Row key={j}>
                            <Col>{Cook_method.name}</Col>
                            <Col>{Cook_method.original}</Col>
                            <Col><img src={`https://spoonacular.com/cdn/ingredients_100x100/${Cook_method.image}`} /></Col>

                            {/*<Button onClick={()=>getmsg(Cook_method.sourceUrl)}>Click</Button>*/}
                        </Row>

                    ))

                }

            </div>


        )
    }
   //  fetch 食譜id的製作方法網址
   async function fetchUrl(recipeid){
       let Message=await fetch(`https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${API_KEY}&includeNutrition=false`)
       console.log(Message)
       let jsonMessage=await Message.json();
       console.log(jsonMessage)
       const Url=jsonMessage.sourceUrl
       setUrl(Url)
       console.log(Url)
   }
    // 將食譜數據顯示在modal上
    function display_recipemessage(recipeid){
        return(
            <div>
                <button  className={"btn-76"}  onClick={handleShow}>
                    <span onClick={()=>{recipemessage(recipeid);fetchUrl(recipeid);recipe_step(recipeid);}}>Show Recipe Message</span>
                </button>

                <Modal show={show} onHide={handleClose} className={"Modal_outside"}>
                    <Modal.Header closeButton className={"Modal_color"}>
                        <Modal.Title>食譜資訊</Modal.Title>
                    </Modal.Header>
                    {isloading==false?<Modal.Body className={"Modal_color"}>
                        {RecipeMessage()}
                        <hr/>
                        <h4>製作方法</h4>
                        {Recipe_Step()}
                        <a href={url} >詳細資料<ArrowRightOutlined /></a>
                    </Modal.Body>:<Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </Space>}
                    <Modal.Footer className={"Modal_color"}>


                        {/*<a href={`${sourceUrl}`}>Product Method<ArrowRightOutlined /></a>*/}
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    // https://spoonacular.com/productImages/{ID}-{SIZE}.{TYPE}


    // 得到關鍵字食譜

    async function getrecipe(){

        let Recipe=await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=${number}&ignorePantry=true`)
        let jsonrecipe=await Recipe.json();
        console.log(jsonrecipe)
        const Recipess=await Promise.all(jsonrecipe.map(async(i)=>{
            const Recipes={
                id:i.id,
                image:i.image,
                title:i.title
            }
            console.log(Recipes)
            return Recipes
        }))
        setRecipe(Recipess.filter(Recipes => Recipes !== null))

    }
    // 隨機生成食譜卡
    async function random_recipe_card(){

        let Recipe_card_Url=await fetch(`https://api.spoonacular.com/recipes/${random}/card?apiKey=${API_KEY}`)

        let Json=await Recipe_card_Url.json()
        console.log(Json)
        setRandomCard(Json.url)
    }
    // 顯示隨機食譜卡
    function display_recipe_card(){
        return(
            <div>
                <Card
                    hoverable
                    style={{ width: 300,height:400 }}
                    cover={<img src={randomcard} />}
                >

                </Card>

            </div>
        )
    }

    async function recipe_step(recipeid){
        let recipe_step=await fetch(`https://api.spoonacular.com/recipes/${recipeid}/analyzedInstructions?apiKey=${API_KEY}`)
        console.log(recipe_step)
        let json=await recipe_step.json()
        let json1=json[0]
        console.log(json)
        let steps=await json1.steps

        console.log(steps)
        console.log(json.steps)
        const step_equipment=await Promise.all(steps.map(async(l)=>{
            const Step_equipment={
                equipment:l.equipment,
                number:parseInt(l.number),
                ingredients:l.ingredients,
                step:l.step.toString()
            }
            return Step_equipment;
        }))
        set_Step_Equipment(step_equipment.filter(Step_equipment => Step_equipment !== null))
        console.log(step_equipment)
    }
    /*食譜步驟*/
    function Recipe_Step(){
        return(
            <div>
                {
                    step_equipment.map((Step_equipment,l)=>(
                        <ul key={l}>
                            {/*<li>{Step_equipment.equipment}</li>*/}
                            <li>{Step_equipment.number}.{Step_equipment.step}</li>
                        </ul>
                    ))
                }

            </div>
        )
    }
    return(
        <div className="background">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container className="background2">
                <img src={Pngtree} className="Pngtree"/>
                <Row>
                    <h1 className="text1">Welcome To My Kitchen</h1>
                </Row>
                <Row className="justify-content-md-center">
                    {/*上傳圖片*/}
                    <Col  md="auto">
                        <ImgCrop rotate>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                        {/*<Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">點擊或拖拽文件到此區域上傳</p>
                            <p className="ant-upload-hint">
                                支持單個或批量上傳。嚴禁上傳公司資料或其他樂隊文件
                            </p>
                        </Dragger>*/}
                        
                    </Col>
                    {/*推薦食譜*/}
                    <Col md="auto">
                        {/*{display_recipe_card()}*/}
                    </Col>


                </Row>
                <br/>

                <div>

                <Row>
                    <section className="controls">
                        <input
                            type="string"
                            placeholder="search recipe"
                            onChange={handlechange}/>

                    </section>
                </Row>
               <Row>
                   <Radio.Group defaultValue={5} style={{ marginTop: 16 }}>
                       <Radio.Button value={5} onChange={handlechange2}>5</Radio.Button>
                       <Radio.Button value={10} onChange={handlechange2}>10</Radio.Button>
                       <Radio.Button value={15} onChange={handlechange2}>15</Radio.Button>
                       <Radio.Button value={20} onChange={handlechange2}>20</Radio.Button>
                   </Radio.Group>
               </Row>

                    {/*<button onClick={()=>random_recipe_card()}>Click me!</button>*/}
                    <br/>
                <Row>
                    {/*<Button onClick={()=>getrecipe()} className="btn-59">Get Daily meal</Button>*/}
                    <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                        Get Daily meal
                    </Button>
                </Row>
                    <br/>

                </div>
                <Row className={"justify-content-md-center"}>
                {
                    recipe.map((Recipes,i)=>(
                    <Card
                        key={i}
                    hoverable
                    style={{
                    width: 240,
                        margin:5,
                }}
                    cover={<img alt="example" src={Recipes.image} />}
                    >
                    <Meta title={Recipes.title} />
                        <br/>
                        {display_recipemessage(Recipes.id)}
                    </Card>
                    ))

                }


            </Row>
                <br/>
            </Container>
            <br/>
            <br/>
            <Container>
                <p className="p">Must No Be Bad~</p>
                <button onClick={()=>populateWeatherData()}>Click</button>
            </Container>
            <br/>

        </div>
    )
}

export default Home1;