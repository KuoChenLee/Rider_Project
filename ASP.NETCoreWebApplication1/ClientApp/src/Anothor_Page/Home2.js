import {Container, Navbar,Button} from "react-bootstrap";
import React,{useState,Component } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import MealList from './MealLIst'
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];
function Home2(){
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const [data,setData]=useState()
    const [mealData,setMealData]=useState(null)
    const [calories,setCalories]=useState(2000)
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    // function handlechange(e){
    //     setCalories(e.target.value)
    // }
    // function getMealData(){
    //     fetch(
    //         `https://api.spoonacular.com/mealplanner/generate?apiKey=58655337b64f49d79640921a919bc10c&timeFrame=day&targetCalories=${calories}`
    //     )
    //         .then((response)=>response.json())
    //         .then((data)=>{
    //         setMealData(data);
    //         console.log(data)
    //     })
    //         .catch(()=>{
    //         console.log("error");
    //     })
    // }

    return(
        <div className="background4">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container className="background2">
                <Switch
                    checked={theme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                    theme={theme}
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />

            </Container>
            <br/>
            <br/>
            <br/>
            {/*<section className="controls">*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        placeholder="Calories (e.g. 2000)"*/}
            {/*        onChange={handlechange}/>*/}
            {/*</section>*/}
            {/*<button onClick={()=>getMealData()}>Get Daily meal</button>*/}
            {/*{mealData && <MealList mealData={mealData}/>}*/}
        </div>
    )
}

export default Home2;