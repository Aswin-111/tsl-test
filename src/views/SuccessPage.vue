// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div class="success-page-container m-0">


<div class="row m-0 mt-3">
    <div class="col-sm-3 success-logo-column">
        <img class="success-logo" src="./images/starlife-logo.png" alt="success-logo">
    </div>
    <div class="success-head col-sm-6">
        <h1 class="success-title">Thank you for registering.</h1>
        <p class="success-content"> You can now see your name under WaitingList.  Members in NewList are those who have  attended the first introduction class.  
            In order to share the introduction zoom class details on your whatsapp, kindly press the WhatsApp icon below . 
            Happy to see you in our meditation family.
        </p>
    </div>
    <div class="col-sm-3">


    </div>
</div>


<div class="whatsapp-message">
    Please click here 
        <a href="https://wa.me/+919008290027" class="whatsapp-link" target="_blank">
            <img class="whatsapp-icon" src="./images/ripple.gif" alt="whatsapp-icon">
        </a> 
        and send a 'hi' for registration completion.
</div>


<div class="success-list-wrap m-0 mt-4">
    
    <div class="row success-list-row">
        <div class="col-sm-6 col-0"></div>
        <div class="col-sm-6 success-list-column">
            <div class="success-list-number">1</div>
            <p class="success-list-name">{{ user_one }}</p>
        </div>
    </div>
    <div class="row success-list-row">
        <div class="col-sm-6 col-0"></div>
        <div class="col-sm-6 success-list-column">
            <div class="success-list-number">2</div>
            <p class="success-list-name">{{ user_two }}</p>
        </div>
    </div>
    <div class="row success-list-row">
        <div class="col-sm-6 col-0"></div>
        <div class="col-sm-6 success-list-column">
            <div class="success-list-number">3</div>
            <p class="success-list-name">{{ user_three }}</p>
        </div>
    </div>
    <div class="row success-list-row">
        <div class="col-sm-6 col-0"></div>
        <div class="col-sm-6 success-list-column">
            <div class="success-list-number">4</div>
            <p class="success-list-name">{{ user_four }}</p>
        </div>
    </div>
    <div class="row success-list-row">
        <div class="col-sm-6 col-0"></div>
        <div class="col-sm-6 success-list-column">
            <div class="success-list-number">5</div>
            <p class="success-list-name">{{ user_five }}</p>
        </div>
    </div>
                  
</div>



<div class="footer-container-wrapper w-100">
    <div class="footer row m-0 p-0">
        <div class="footer-sub-grp col-3">
            <span class="footer-update">0</span>
            <span class="footer-head">Total meditators</span>
        </div>
        <div class="footer-sub-grp col-3">
            <span class="footer-update">{{ registeredUsersCount }}</span>
            <span class="footer-head">Waiting List</span>
        </div>
        <div class="footer-sub-grp col-3">
            <span class="footer-update">0</span>
            <span class="footer-head">Benefactories</span>
        </div>
        <div class="footer-sub-grp col-3">
            <span class="footer-update">0</span>
            <span class="footer-head">Classes</span>
        </div>
    </div>
</div>



</div>

</template>



<script>
import io from "socket.io-client";
import axios from "axios";

import "bootstrap";
export default{
  name : 'SuccessPage',
  data() {
    return{
        user_one : "",
        user_two : "",
        
        user_three : "",
        user_four : "",
        user_five : "",
      registeredUsersCount:0,
      usersdata : []
    }
   
},
created(){
    setTimeout(()=>{
        window.location.href = "https://wa.me/+919008290027"
    },30000)
    let id = localStorage.getItem('id')
    
      this.connection = io("http://89.47.164.122:3000"); // Use io() to establish a Socket.io connection
  
      this.connection.on("connect", () => {
        console.log("Connected to the Socket.io server");
        this.connection.emit("fetchusers"); // Emit the 'fetchusers' event to the server

        setInterval(() => {
          this.connection.emit("fetchusers"); // Emit the 'fetchusers' event to the server
        }, 20000);
      });

      this.connection.on("usersupdate", (data) => {
        console.log("Users update received:", data.results[0].count);

        this.registeredUsersCount = data.results[0].count;
        console.log(this.registeredUsersCount)
        // Handle the received data here
      });

      this.connection.on("error", (errorMessage) => {
        console.error("Socket error:", errorMessage);
      });
    axios
        .get(`http://localhost:3000/api/registrations/listName/${id}`, {
        }).then((res)=>{
console.log(res.data)
this.usersdata = res.data


try{
this.user_one = this.usersdata[0]["name"] || "Albin"
this.user_two = this.usersdata[1]["name"] ||  "Nandana"
this.user_three = this.usersdata[2]["name"] || "Krishna das"
this.user_four = this.usersdata[0]["name"] || "Jeffin"
this.user_five = this.usersdata[0]["name"] || "Jasmin"
}
catch(err){
    
    console.log(err);
}
        })
}
}
</script>


<style scoped>

@import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
/* @import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; */

.success-page-container {
    background-image: url("./images/back-success.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding: 0;
}

.success-logo {
    width: 60%;
}

.success-head {
    text-align: center;
}

.success-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 2.5rem;
}

.success-content {
    line-height: 1.5;
    font-size: 1rem;
    /* font-weight: bold; */
    font-size: 1.1rem;
    color: #576574;
}


.whatsapp-message {
   margin: 15px;
   padding: 2% 5%;
   text-align: center;
   font-size: 1.5rem;
   font-weight: 600;
}

.whatsapp-link {
    width: 60px;
    height: 60px;
    background-color: transparent;
    /* background-image: url("./images/ripple.gif");
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden; */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 50px;
    position: relative;
}
.whatsapp-icon {
    color: #128C7E;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    top: 3vh;
}


/* Name List Section */


.success-list-wrap {
    padding-bottom: 5px;
}

.success-list-row {
    font-size: 1.2rem;
    height: 7vh;
    text-align: center;
    margin: 0 0 8px 0;
}

.success-list-row:first-of-type {
    /* background-color: black; */
    background-image: linear-gradient(to right,rgba(1,1,1,0.2%),transparent,grey,grey,grey);
    color: white;
}

.success-list-column {
    display: flex;
    align-items: center;
}

.success-list-number {
    height: 5vh;
    width: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    border-radius: 0 16px 0 16px;
    margin-right: 5px;
}

.success-list-row:first-of-type .success-list-number {
    background-color: white;
    color: black;
}

.success-list-name {
    font-size: 1.8rem;
    font-weight: 500;
    /* color: black; */
}







/* Footer Section */


.footer-container-wrapper {
    padding: 2% 6%;
    margin: 3px 0 0 0;
    background-color: rgba(0, 0, 0, 0.74);
    color: white;
}

.footer .footer-sub-grp {
    display: flex;
    flex-direction: column;
    align-items: center;
}
  
.footer .footer-sub-grp .footer-head {
    font-weight: 400;
}
  
.footer .footer-sub-grp .footer-update {
    font-weight: bold;
}




/* ------------------------Media breakpoints----------------------- */


@media only screen and (max-width: 600px) {
  
    .success-logo-column {
        text-align: center;
        margin: 0 auto;
    }

    .success-logo {
        width: 50%;
    }

    .success-title {
        font-size: 1.5rem;
    }

    .success-content {
        font-size: 1rem;
    }

    /* whatsapp message */

    .whatsapp-message {
        font-size: 1.2rem;
        line-height: 1.5;
    }

    .whatsapp-link {
        width: 30px;
        height: 30px;
    }

    .whatsapp-icon {
        width: 30px;
        height: 30px;
        top: 1vh;
    }
    

    /* Success List */
    .success-list-row {
        font-size: 1.3rem;
        height: 7vh;
        text-align: center;
        margin: 0 0 5px 0;
        padding-left: 40%;
    }
    
    .success-list-row:first-of-type {
        background-image: linear-gradient(to right,rgba(1,1,1,0.2%),grey,grey,grey,grey);
    }
    .success-list-name {
        font-size: 1.3rem;
        font-weight: 500;
    }
    

    /* Footer */
    
    .footer-container-wrapper{
        padding: 4% 6%;
        /* position: absolute;
        bottom: 0;
        left: 0; */
    }

    .footer .footer-sub-grp {
        text-align: center;
    }

    .footer .footer-sub-grp .footer-head {
        font-size: 0.8rem;
    }
      
    .footer .footer-sub-grp .footer-update {
        font-size: 0.9rem;
    }


}

</style>
