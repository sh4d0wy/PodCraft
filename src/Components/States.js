import {proxy }from 'valtio';

const state = proxy({
    flow:"script",
    title:"",
    generate:false,
    generating:false,
    data:"Welcome to ProdCraft",
    guest:"no",
    guestName:"",
    tone:"friendly",
    count:"",
    file:"",
    percentage:50,
    sentiment : "",
    imgSource:"",
    loading:false
})

export default state;