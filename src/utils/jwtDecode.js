function jwtDecode(val) {
    return JSON.parse(Buffer.from(val.split('.')[1], 'base64').toString());
  }
  
  export default jwtDecode;

// const { url } = require("inspector");
// const { Util } = require("leaflet");

// const fetchGetUser = (id) => {
//     axios({
//         method
//         url: `base_url/api/user/${id}`
//         headers
//     }).then((res) => {
//         if(res.status === 200) {
//             return res.data.data;
//         }
//     })
// }


// if(res.status === 200) {
//     const token = res.data.token;
//     const id = (jwtDecode(token))?.sub;
//     const dataUser = fetchGetAllUser(id);
// }

// string.includes(substring)


// id
// name
// slug : upt-psda-bondowoso
// photo
// email
// email_verified
// created_at
// updated_at