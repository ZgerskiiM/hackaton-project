<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          width="100"
        >
          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-btn id="name"
            rounded="xm"
            disabled>G
            </v-btn>
            <v-btn :to="({ name: 'Main' })">
                    <v-icon>
                    mdi-home
                    </v-icon>
                </v-btn>
                <v-btn :to="({ name: 'Books' })">
                    <v-icon>
                    mdi-book-education
                    </v-icon>
                </v-btn>
                <v-btn :to="({ name: 'Diary' })">
                    <v-icon>
                    mdi-notebook
                    </v-icon>
                </v-btn>
                <v-btn :to="({ name: 'Support' })">
                    <v-icon>
                    mdi-help
                    </v-icon>
                </v-btn>
                <v-btn :to="({ name: 'Music' })">
                    <v-icon>
                    mdi-music
                    </v-icon>
                </v-btn>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>

<style scoped>
.v-navigation-drawer {
    background-color:rgb(0, 0, 0);
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;

}

.v-layout {
    background-color: transparent;
}


.v-btn {
    margin-top: 20px;
}

#name {
    color: black;
    font-size:32px;
    font-weight: 450;

}
</style>
