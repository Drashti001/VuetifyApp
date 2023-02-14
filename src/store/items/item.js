import axios from "axios";

const state = {
    itemlist:[],
};
const getters ={
    itemlist:state => {
        return state.itemlist;
    }
};
const mutations={
     //view all items of itemlist json array
    set_items(state,itemlist){
        state.itemlist = itemlist
    },
    //delete item from itemlist json array
    delete_items(state,id){
        let index = state.itemlist.findIndex((items) => items.id == id);
        state.itemlist.splice(index , 1);
    },
    //update item in itemlist json array
    edit_items:(state,items) =>(state.itemlist == state.itemlist.map((item) =>{
        if(item.id === items.id){
            return Object.assign({},item , items.data);
        
        }
        return item;
    })),
    add_items :(state,itemlist) => state.itemlist.unshift(itemlist)
    
};

const actions ={
    //fetching the data from json file using http get method
    getItems({commit}){
        axios.get('http://localhost:3000/itemlist',{

        }).then(response => response.data ).then(itemlist =>
            {
                //console.log(itemlist);
                commit('set_items',itemlist)
            })
        },
        async addItems({commit},items){
            const response = await axios.post("http://localhost:3000/itemlist",items);
            console.log(items);
            commit("add_items",response.data);
        },

        async deleteItems({commit},id){
            const response = await axios.delete(`http://localhost:3000/itemlist/${id}`);
            if(response.status == 200 || response.status == 204){
                commit("delete_items",id);
            }
        },
        async updateItems({ commit }, items) {
            let response = await axios.put(
              `http://localhost:3000/itemlist/${items.id}`,
              items
            );
            commit("edit_items", response.data);
          },   


}
export default{
    state,
    getters,
    mutations,
    actions
}
