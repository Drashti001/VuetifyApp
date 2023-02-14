 <template >
  <div>
    <v-card md="12">
      <h1 class="text-center text--white mt-5 ">INVENTORY MANAGEMENT SYSTEM</h1>
    </v-card>
    <v-spacer></v-spacer>
    <v-container >
      
      
      <v-row dense class="mt-10">
        <v-col md="6">
          <v-hover >
            <v-card>
              <v-card-text><router-link to="/allcg" style="text-decoration: none;">
                <h2  class="text-center text--white">ALL Categories</h2></router-link>
                <h2
                  style=" margin-top:20px; height: 50px"
                  class="text-center text--white"
                >TOTAL CATEGORIES:: {{cardCategory.category.length}}</h2>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col md="6">
          <v-hover>
            <v-card>
              <v-card-text><router-link to="/allitems" style="text-decoration: none; ">
                <h2 class="text-center text--white">ALL ITEMS</h2></router-link>
                <h2
                  style="margin-top:20px; height: 50px"
                  class="text-center text--white"
                >TOTAL ITEMS:: {{cardItem.itemlist.length}}</h2>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    
      <!-- <h1>{{ cardCategory }}</h1> -->
      <!-- <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img> -->
      
   
  </div>
   
</template>

<script>





export default {
  name: "HomePage",
  data: () => ({
    cardCategory:'',
    cardItem: '',
  
  }),
  created() {
    this.initialize();
   // this.getData();
  },
  methods: {
    onClickOutside () {
        this.active = false
      },
    async initialize(){
      this.$store.dispatch('getData');
      this.cardCategory =this.$store.state.category;
      //console.log(this.cardCategory,'Getting Category Data');

      this.$store.dispatch('getItems');
      this.cardItem= this.$store.state.item;
      //console.log(this.cardItem,'getting itemlist');

    },
   
  },
}
</script>
