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
        Thanks For Submit Categories !
      </v-alert>
    </v-col>
  </div>
    
  <v-toolbar>
    <v-toolbar-title>ALL ITEM CAREGORIES</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/allcg" style="float: right"
        ><v-btn color="primary" dark class="mb-2 mx-3" >
        VIEW ALL CATEGORIES<v-icon>mdi-view-dashboard</v-icon>
        </v-btn></router-link
      >
    <router-link to="/" style="float: right"
        ><v-btn color="primary" dark class="mb-2 mx-2" >
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
  
      <v-text-field
        v-model="description"
        :rules="descRules"
        label="Description"
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
      description:"",
      checkbox:'',
      status:true,
      checked:false,
      valid: true,
      
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length > 5) || 'Name must be more than 5 characters',
      ],
      
      descRules: [
        v => !!v || 'Description is required',
        
      ],
     
     
    }),
    methods: {
      validate(){
        let addlist ={
          name:this.name,
          description : this.description,
          status: true,
        };
        //check if name , description and checkbox are null
        if(this.name == "" || this.description == "" || this.checkbox == this.checked){
          //validate user 
          this.$refs.form.validate();
        }else{
          this.$store.dispatch("addCategories",addlist).then(() =>{
            console.log(addlist,'data added');
            this.alert =true;
            setTimeout(() =>{
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