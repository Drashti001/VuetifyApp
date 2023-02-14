<template>
  <v-app>
      <nav>
          <v-snackbar v-model="snackbar" :timeout="4000" top color="lightblue">
              <span>Awesome !! you added a new project.</span>
              <v-btn flat color="grey" @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <v-toolbar >
              <v-app-bar-nav-icon class="mx-2" fab dark small color="light-blue" @click="drawer = !drawer"></v-app-bar-nav-icon>
  
              <v-toolbar-title class="text-uppercase white--text">
                  <span class="font-weight-light">Welcome User !!!</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
  
              <v-btn class="mx-2" fab dark small color="light-blue">
                  <v-icon dark>
                      mdi-heart
                  </v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="light-blue">
                  <v-icon dark>
                      mdi-bell
                  </v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="light-blue">
                  <v-icon dark>
                      mdi-dots-vertical
                  </v-icon>
              </v-btn>
  
          </v-toolbar>
          <v-navigation-drawer v-model="drawer" app>
              <v-layout column align-center class="my-5">
                  <v-flex class="mt-5">
                      <v-avatar size="100">
                          <img src="/img3.png" />
  
                      </v-avatar>
                      <p class="white--text subheading mt-2 mx-2" align-center>
                          USERNAME
                      </p>
                  </v-flex>
                 
              </v-layout>
  
              <v-card >
                  <v-list>
                      <template>
                      <v-list-item v-for="i in homes" :key="i.text" router :to="i.route">
                          <v-list-item-icon>
                              
                                  <v-icon >{{i.icon}}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ i.text }}</v-list-item-title>
                       
  
                        
                      </v-list-item>
                  </template>
  
  
                      <v-list-group  prepend-icon="mdi-cart">
                          <template v-slot:activator>
                              <v-list-item-title>ITEM CATEGORY</v-list-item-title>
                          </template>
                          <template >
                              <v-list-item v-for="c in categories" :key="c.text" router :to="c.route">
                                  <v-list-item-action>
                                   
                                       <v-list-item-title>{{ c.text }}
                                          <v-list-item-icon>
                                              <v-icon>{{c.icon}}</v-icon>
                                          </v-list-item-icon>
                                       </v-list-item-title>
                                       
                                   </v-list-item-action>
                               </v-list-item> 
                                
                            </template>
                         
                      </v-list-group>
                      <v-list-group  prepend-icon="mdi-account-circle">
                              <template v-slot:activator>
                                  <v-list-item-title>ITEMS</v-list-item-title>
                              </template>
                              <template >
                                  <v-list-item v-for="item in items" :key="item.text" router :to="item.route">
                                      <v-list-item-action>
                                           <v-list-item-title>{{ item.text }}
                                              <v-list-item-icon>
                                                  <v-icon right>{{item.icon}}</v-icon>
                                              </v-list-item-icon>
                                           </v-list-item-title>
                                           
                                       </v-list-item-action>
                                   </v-list-item> 
                                    
                                </template>
                             
                      </v-list-group>
                          
                  </v-list>
              </v-card>
              
          </v-navigation-drawer>
          <v-main>
              <v-container fluid  >
                  <!-- If using vue-router -->
                  <router-view></router-view>
              </v-container>
          </v-main>
  
      </nav>
  </v-app>
  </template>
  
  <script>
  //import HomePage from './components/HomePage.vue';
  //import HelloWorld from './components/HelloWorld';
  
  //import AllCategories from './components/AllCategories.vue';
  
  export default {
      name: 'App',
  
      components: {
          //HomePage
  
      },
  
      data: () => ({
          drawer: false,
          selectedItem: 1,
          snackbar: false,
          homes: [{  text: "HOMEPAGE",icon: "mdi-home", route:'/' }],
          categories: [
            {
                  text: 'ALL CATEGORIES',
                  icon: 'mdi-view-dashboard',
                  route: '/allcg'
  
              },
              {
                  text: 'ADD NEW CATEGORIES',
                  icon: 'mdi-cart',
                  route: '/addcg'
              },
  
          ],
          items: [
            {
                  text: 'ALL ITEMS',
                  icon: 'mdi-view-dashboard',
                  route: '/allitems'
  
              },
              {
                  text: 'ADD NEW ITEMS',
                  icon: 'mdi-cart',
                  route: '/additems'
              },
  
          ]
      })
  };
  </script>
  