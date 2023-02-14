<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
    <div class="d-flex justify-center ma-4">
      <v-col sm="12">
        <v-alert
          dense
          type="primary"
          v-model="alert"
          elevation="16"
          style="opacity: 0.8"
          border="top"
          transition="scale-transition"
          max-height="150"
          dismissible
        >
          Thanks For Adding Items !
        </v-alert>
      </v-col>
    </div>
      
    <v-toolbar>
      <v-toolbar-title>ALL ITEMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/allitems" style="float: right"
          ><v-btn color="primary" dark class="mb-2 mx-3" >
          VIEW ALL ITEMS<v-icon>mdi-view-dashboard</v-icon>
          </v-btn></router-link
        >
      <router-link to="/" style="float: right"
          ><v-btn color="primary" dark class="mb-2 mx-2">
           BACK TO HOMEPAGE <v-icon>mdi-arrow-right</v-icon>
          </v-btn></router-link
        >
    </v-toolbar>
      
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-select
          v-model="category"
          :items="categories"
          label="Select Item Category"
          dense
          outlined
          required
          :rules="categoryRules"
        ></v-select>
    
        <v-text-field
          v-model="description"
          :rules="descRules"
          label="Description"
          required
        ></v-text-field>

        <v-text-field
        v-model="price"
        :rules="priceRules"
        label="Price"
        required
        
         ></v-text-field>

  
        
    
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          name="checked"
          required
        ></v-checkbox>
    
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          SUBMIT
        </v-btn>
    
        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
         RESET FORM
        </v-btn>
    
      </v-form>
    </template>
    <script>
    export default {
      data: () => ({
        alert:false,
        name:"",
        category:"",
        description:"",
        price:"",
        status:true,
        checked:false,
        checkbox:'',
        valid: true,
        categories:['Dairy','Fruits','Grains','Protein Foods','Vegetables','Beverages','Oils & Solid Fats'],
        
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length > 3) || 'Name must be more than 3 characters',
        ],
        
        descRules: [
          v => !!v || 'Description is required',
          
        ],
        priceRules: [
          v => !!v || 'Price is required',
          v => (v >= 0 || v <= 9) || 'Price Must be Numeric type',
         
        
        ],
        categoryRules:[
            v => !!v || 'Category is required'
        ]
       
       
      }),
      methods: {
        validate(){
          let additem ={
            name:this.name,
            category:this.category,
            description : this.description,
            price:this.price,
            status: true,
          };
          //check if name , description 
          if(this.name == "" || this.description == "" || this.price == "" || this.category == "" ||this.checkbox == ""){
            //validate user 
            this.$refs.form.validate();
          }else{
            this.$store.dispatch("addItems",additem).then(() =>{
              console.log(additem,'data added');
              this.alert =true;
              setTimeout(() => {
                 this.alert =false;
              }, 3000);
              this.$refs.form.reset();
            });
            
          }
        },
         
        
        reset() {
           this.$refs.form.reset();
      },
    
    }
  }
  
          
        
    
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>