<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer width="100">
        <v-divider></v-divider>

        <v-list density="compact" nav class="centered-list">
          <div class="top-buttons">
            <v-btn id="name" rounded="xm" disabled>G</v-btn>
            <v-btn :to="{ name: 'Main' }">
              <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn :to="{ name: 'Books' }">
              <v-icon>mdi-book-education</v-icon>
            </v-btn>
            <v-btn :to="{ name: 'Diary' }">
              <v-icon>mdi-notebook</v-icon>
            </v-btn>
          </div>
          <div class="bottom-buttons">
            <v-btn :to="{ name: 'Support' }">
              <v-icon>mdi-help</v-icon>
            </v-btn>
          </div>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style scoped>
.v-navigation-drawer {
  background-color: rgb(0, 0, 0);
  color: white;
}

.v-layout {
  background-color: transparent;
}

.centered-list {
  display: flex;
  flex-direction: column;
  height: 99%;
}

.top-buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bottom-buttons {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.v-btn {
  margin-top: 20px;
}

#name {
  color: black;
  font-size: 32px;
  font-weight: 450;
}
</style>
