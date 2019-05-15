// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// // import Home from "../home/home";
// import Nav2 from "../home/nav2";
// // import Home from "../home/home";

// // import styles from "./artists.module.scss";
// import styles from "./discover.module.scss";
// import style from "../discover/artists.module.scss";

// import Axios from "axios";

// export class artists extends Component {
//   constructor() {
//     super();
//     this.state = {
//       creators: []
//     };
//   }
//   componentDidMount() {
//     Axios.get("/auth/creators").then(res => {
//       this.setState({
//         creators: res.data
//       });
//     });
//   }
//   render() {
//     console.log(this.state.creators);
//     let mapped = this.state.creators.map((val, index) => {
//       return (
//         <div key={index}>
//           <Nav2 />
//           <div className={style.artists}>
//             <div className={style.map}>
//               <img src={val.img} />
//               <h3>Artist: {val.name}</h3>
//               <h3>Practice: {val.medium}</h3>
//               {/* <h3>Bio: {val.bio}</h3> */}
//             </div>
//           </div>
//         </div>
//       );
//     });
//     return (
//       <div>
//         <div className={styles.creators}>
//           <Link className={styles.linkto} to="/discover">
//             <button className={styles.button}>Works</button>
//           </Link>
//           <Link to="/auth/creators" className={styles.linkto}>
//             <button className={styles.button}>Artists</button>
//           </Link>
//         </div>
//         <div className={styles.allMapped}>{mapped}</div>
//       </div>
//     );
//   }
// }

// export default artists;
