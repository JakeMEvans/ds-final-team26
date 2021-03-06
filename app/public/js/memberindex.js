var app = new Vue({
  el: '#memberPage',
  data:{
    members: [],



    newMember: {
      PersonID: "",
      firstName:"",
      lastName: "",
      DOB: "",
      Address: "",
      Email: "",
      Position: "",
      startDate: "",
      radioNum: "",
      stationNum: "",
      isActive: "",
    },

    selectedMember: {



    },

    thisblankselect: null,
    updatedMember:{

    }
  },





  methods: {





    fetchMember(){
        fetch("api/members/memberindex.php")
        .then( response => response.json() )
        .then ( json => {
          this.members = json;
          console.log(this.members);
  });

},

createMember(){
        fetch('api/members/memberpost.php', {
          method: 'POST',
          body: JSON.stringify(this.newMember),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
          }
        })
        .then ( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.members.push(json[0]);
          this.newMember = this.newMemberData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMember);
},

newMemberData() {
   return {
     PersonID: "",
     firstName:"",
     lastName: "",
     DOB: "",
     Address: "",
     Email: "",
     Position: "",
     startDate: "",
     radioNum: "",
     stationNum: "",
     isActive: "",
   }

 },

 updateMember () {
   console.log('populating' + this.selectedMember);
     this.updatedMember.PersonID = (this.selectedMember);
     fetch('api/members/memberupdate.php', {
       method:'POST',
       body: JSON.stringify(this.updatedMember),
       headers: {
         "Content-Type": "application/json; charset=utf-8"
       }
     })
     .then( response => response.json() )
     .then( json => {
       console.log("Returned from post:", json);
       this.members = json;
       this.updatedMember = this.updatedMemberData();
     });
     alert('Member Updated!')
     console.log("Creating (POSTing)...!");
     console.log(this.updatedMember);
   },
   updatedMemberData() {
     return {
       PersonID: "",
       firstName:"",
       lastName: "",
       DOB: "",
       Address: "",
       Email: "",
       Position: "",
       Phone: "",
       startDate: "",
       radioNum: "",
       stationNum: "",
       isActive: "",
     }
   },


del (index) {
   //this.certs(index.CertificationID);
   fetch('api/members/memberdelete.php', {
     method:'POST',
     body: JSON.stringify(index),
     headers: {
       "Content-Type": "application/json; charset=utf-8"
  }


  })

  .then(this.fetchMember());



}




},

  created(){
    this.fetchMember();
    }
  });
