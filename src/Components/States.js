import {proxy }from 'valtio';

const state = proxy({
    title:"",
    generate:false,
    data:"Welcome to ProdCraft"
})

export default state;