<template>
  <div class="container">
    <div class="container-title">
      <h1 class="title-main">Телефонная книга</h1>
    </div>
    <div class="Contact-menu">
      <div class="menu-header">
        <div class="menwrap">
          <div class="find-nomer"></div>
          <div class="numbers">
            <button class="but">1</button>
            <button class="but">2</button>
            <button class="but">3</button>
          </div>
          <div class="creat-contact">
            <form @submit.prevent="submit" class="inputcont">
              <input class="input-name" type="text" placeholder="full name" v-model="name" />
              <input class="input-number" type="number" placeholder="phone number" v-model="phone" />
              <button class="btn-name">create</button>
            </form>
          </div>
          <div class="cards-Num">
            <div class="menus">
              <select name="select">
                <option value="elect-css">find number</option>
                <option value="elect-css" selected>find data num</option>
              </select>
              <input class="bobas" type="number" placeholder="find number" />
            </div>
            <div>
        
              <ul>
                <li v-for="(contact, index) in allContacts" :key="contact.id">
                  <span>
                    <span>{{ index + 1 }}</span>
                    <span> Name: {{ contact.name }}</span>
                    <span> Phone: {{ contact.phone }}</span>
                    <button class="delete" @click="deleteContact(contact.id)">x</button>
                    <button @click="edit ? editContact(contact.id) : edit = true">{{ edit ? 'save' : 'edit' }}</button>
                    <div class="edit-inputs" v-if="edit">
                    <input v-model="editedName" type="bobas1" />
                    <input v-model="editedPhone" type="bobas1" />
                  </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">LOADING...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'; 

export default {
  data() {
    return {
      name: "",
      phone: "",
      edit: false,
      editedName: '',
      editedPhone: '',
      editActive: {},
    }
  },
  computed: {
    ...mapGetters({
      allContacts: 'getAllContacts',
      loading: 'getLoading'
    }) 
  },
  mounted() {
    this.$store.dispatch('getAllNumbers')
  },
  methods: {
    submit() {
      this.$store.dispatch('addContact', {
        name: this.name,
        phone: this.phone,
        createdAt: Date.now()
      });
      this.title = ""; 
      this.number1 = "";
    },
    deleteContact(id) {
      this.$store.dispatch('deleteContact', id)
    },
    editContact(id) {
      this.$store.dispatch('editContact', { id, name: this.editedName, phone: this.editedPhone })
      this.edit = false
    }
  }
}
</script>


<style>
.bobas1 {
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #ccc;
}
.delete {
  margin-left: 500px;
}

.bobas {
  border-radius: 4px;
}
.elect-css {
  border: none;
    outline: none;
}
.but {
  background-color: aliceblue;
  width: 40px;
  height: 40px;
  margin-top: 29px;
  border-radius: 6px;
}
.inputcont {
  display: flex;
}
.numbers {
  display: flex;
  justify-content: center;
}
.input-name {
  border: 1px solid #000;
    border-radius: 5px;
    padding: 2px;
    text-align: center;
}
.input-number {
  border: 1px solid #000;
    border-radius: 5px;
    padding: 2px;
    text-align: center;
}
.creat-contact {
  display: flex;
  margin-left: 1000px;
}
.container-title{
  align-items: center;
    background: purple;
    display: flex;
    height: 80px;
    width: 100%;
    border-radius: 9px;
}
.title-main {
  margin: auto;
    width: 95%;
    color: rgb(255, 255, 255);
}
.Contact-menu {
  align-items: center;
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    width: 380px;
}
.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6161cac0;
  opacity: 0.4;
}
.menu-header {
  background-color: #dddddd;
    margin-top: 675px;
    border-radius: 10px;
    width: 2000px;
    margin-left: 40px;
    height: 700px;
}
.menus {
  margin-top: -44px;
}
.cards-Num {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

li span {
  flex-basis: 50%;
}

li:nth-child(odd) {
  background-color: #e0e0e0;
}
</style>