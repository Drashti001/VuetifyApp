import axios from "axios";

const state = {
    category:[],
};
  const getters=  {
    category:state => {
      return state.category;
    },
    allcategories: (state) => state.categories,
  };
 const  mutations ={
  //view all categories data
    set_category(state,category) {
      state.category = category
    },
    //add category data
    add_category: (state, categorie) => state.category.unshift(categorie),
    //delete category from json file
    delete_categories(state,id){
      let index = state.category.findIndex((categorie) => categorie.id == id);
      state.category.splice(index , 1);
    },
    //update categories from json file
    edit_category : (state,categories)=> (state.category == state.category.map((categorie) => {
      if(categorie.id === categories.id){
        return Object.assign({}, categorie ,categories.data);
      }
      return categorie;
    })),
  };
 const actions= {
    getData({commit}){
      axios.get('http://localhost:3000/category',{
       
        }).then(response =>response.data).then(category =>
          {
            console.log(category);
            commit('set_category',category)
          })
      },
      async addCategories({ commit }, categorie) {
        const response = await axios.post(
          "http://localhost:3000/category",
          categorie
        );

        console.log(categorie);
        commit("add_category", response.data);
      },
      async deleteCategories({commit},id){
        const response = await axios.delete(`http://localhost:3000/category/${id}`);
        if(response.status == 200 || response.status == 204){
          commit("delete_categories",id);
        }
      } ,
      async updateCategories({ commit }, categorie) {
            let response = await axios.put(
              `http://localhost:3000/category/${categorie.id}`,
              categorie
            );
            commit("edit_category", response.data);
          },   
    }
export default{
    state,
    getters,
    mutations,
    actions
}

