export const styles_doc:string =`
<style id="style_doc">

/* You can add global styles to this file, and also import other style files */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
:root{
  --fondo:#e9e9e9;
  --white:white;
  --sombra:rgba(0,0,0,0.2);
  --primary:#0f69f1;
  --green:rgba(50,250,100);
  --text:rgba(0,0,0,0.8);
  --danger:rgb(255, 35, 35);
  --edit:rgb(255, 146, 29);
  --backgroundSombra:rgba(210, 210, 210, 0.5);
}
.close{
  width:30px;
  height:30px;
  color:white;
  border-radius:100px;
  display:flex;
  justify-content:center;
  align-items: center;
  cursor:pointer;
}
.close:hover{
  transform:scale(0.9);
}
.center-v{
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;
}
.center-h{
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:row;
}
.bubble{
  border-radius:100px;
}
.edit{
  background:var(--edit);
}
.edit-txt{
  color:var(--edit);
}
.edit-border{
  border-color:var(--edit);
}
.danger{
  background:var(--danger);
}
.danger-txt{
  color:var(--danger);
}
.text{
  background:var(--text);
}
.text-txt{
  color:var(--text);
}
.green-txt{
  color:var(--green)
}
.primary{
  background:var(--primary);
}
.primary-txt{
  color:var(--primary);
}
.border-primary{
  border-color:var(--primary);
}
.border-green{
  border-color:var(--green);
}
.border-edit{
  border-color:var(--edit);
}
.fondo{
  background:var(--fondo);
}
.fondo-txt{
  color:var(--fondo);
}
.white{
  background:var(--white);
}
.white-txt{
  color:var(--white);
}
.img{
  width:70%;
  display:block;
}
*{
  padding:0;
  margin:0;
  font-family:'Ubuntu','Open Sans',sans-serif,'Source Sans Pro';
  box-sizing:border-box;
  color:var(--text);
  transition:200ms ease-in-out;
}
input,select{
  padding:8px;
  font-size:18px;
  display:block;
  margin:30px auto;
  border-radius:4px;
  border:3px solid var(--sombra);
  outline-color:var(--primary);
}
input:focus{
  border-color:var(--primary);
}
.is-invalid{
  border-color:var(--danger);
}
button{
  display:block;
  max-width:200px;
  padding:8px;
  background-color:var(--white);
  border:3px solid var(--primary);
  border-radius:4px;
  margin:auto;
}
button span{
  color:var(--primary);
  font-size:18px;
  font-weight:bolder;
}
button:hover{
  cursor:pointer;
  background:var(--primary);
  border-color:var(--white);
}
button:hover span{
  color:var(--white);
}
.search{
  padding:10px;
  display:inline-flex;
  justify-content:flex-start;
  height:120px;
  align-items:center;
}
.search button{
  background-color:var(--primary);
  border:none;
  padding-left:13px;
  padding-right:13px;
  border-top-left-radius:0px;
  border-bottom-left-radius:0px;
}
.search input{
  border-width:2px;
  border-top-right-radius:0px;
  border-bottom-right-radius:0px;
}
.search img{
  width:20px;
}
.between{
  justify-content:space-between;
}
.table{
  display:block;
  margin:auto;
  margin-top:20px;
  width:95%;
  height:100%
}
.table thead{
  display:block;
  width:100%;
}
.table tr{
  display:grid;
  grid-template-columns:repeat(8,1fr);
  justify-content:center;
  align-items:center;
}
.table thead tr{
  border-bottom:0.2px solid var(--sombra);
  padding:10px;
  margin-bottom:20px;
}
.table thead th{
  font-size:16px;
}
.table tbody tr{
  padding:5px;
}
.table tbody td{
  text-align:center;
}
.table tbody{
  display:block;
}
.table tbody tr:hover{
  background-color:var(--primary);
  cursor:pointer;
}
.table tbody tr:hover td{
  color:var(--white);
}
.table tbody{
  height:80vh;
  max-height:80%;
  overflow-y:scroll;
}
.tr-12{
  grid-template-columns:repeat(12,1fr)!important;
}
.tr-11{
  grid-template-columns:repeat(11,1fr)!important;
}
.tr-10{
  grid-template-columns:repeat(10,1fr)!important;
}
.tr-9{
  grid-template-columns:repeat(9,1fr)!important;
}
.tr-8{
  grid-template-columns:repeat(8,1fr)!important;
}
.tr-7{
  grid-template-columns:repeat(7,1fr)!important;
}
.tr-6{
  grid-template-columns:repeat(6,1fr)!important;
}
.tr-5{
  grid-template-columns:repeat(5,1fr)!important;
}
.tr-4{
  grid-template-columns:repeat(4,1fr)!important;
}
.tr-3{
  grid-template-columns:repeat(3,1fr)!important;
}
.tr-2{
  grid-template-columns:repeat(2,1fr)!important;
}
.tr-1{
  grid-template-columns:repeat(1,1fr)!important;
}
.btn-group{
  display:grid;
  width:90%;
  margin:10px auto;
}

.document{
  width:95%;
  margin:30px auto;
  border:0.2px solid var(--sombra);
  padding:10px;
  margin-bottom:50px;
}
.header-doc{
  min-height:200px;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.header-doc img{
  display:block;
  margin:auto;
  width:100px;
}
.header-doc .center{
  text-align:center;
}
.header-doc .center h3{
  line-height:2;
}
.header-doc .right h3{
  margin-bottom:10px;
}
.header-doc .right h3{
  color:var(--primary);
  text-align:center;
}
.header-doc .right h5{
  color:var(--primary);
  margin-top:30px;
  text-align:center;
  margin-bottom:20px;
}
.header-doc .left h2{
  text-align:center;
}
.medium{
  border:0.2px solid var(--sombra);
}
.medium h3{
  width:100%;
  color:var(--primary);
  background-color:var(--backgroundSombra);
  text-align:center;
  padding:7px 0px;
}
.medium-down{
  display:flex;
  justify-content:space-between;
  padding:10px;
}
.medium-down ul{
  list-style:none;
}
.medium-down ul li{
  padding:5px;
}
table{
  border:0.2px solid var(--sombra);
  width:100%;
}
table tr{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  justify-items:center;
  align-items:center;
  padding:4px;
}
table tbody tr:hover{
  background-color:var(--primary);
}
table tbody tr:hover td{
  color:var(--white);
}
table th{
  display:block;
  margin-bottom:20px;
  text-align:center;
}
tfoot{
  display:block;
  margin-top:200px;
  background-color:var(--backgroundSombra)
}
tfoot tr{
  padding:20px;
}
/* table thead tr th{
  font-size:17px;
}
table tbody tr td{
  text-align:center;
}
.tr-body{
  margin-top:30px;
} */
.OTROS{
  background:var(--edit)!important;
  color:white;
}
</style>
`
