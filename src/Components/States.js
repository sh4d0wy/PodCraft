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
    count:""
})

export default state;