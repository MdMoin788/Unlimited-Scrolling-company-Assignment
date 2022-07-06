import React, { useEffect, useState } from "react";
import axios from "axios"
function Scrolling() {
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  useEffect(() => {
    
    fetchData(page);
  }, []);

  function fetchData(page) {
    axios.get(`https://unlimited-scrolling-page.herokuapp.com/random?page=${page}&results=10`).then((res) => {

      if (page > 1) {
        let resultAr = [...data, ...res.data.random];
        // console.log('res', ...res.data.random);

        setData(resultAr);
      } else {
        setData([...res.data.random]);
        // console.log('res', ...res.data.random);
        


      }
    })
  }
  const handleScrollling = (scroll) => {
    let bottom = scroll.target.scrollHeight - scroll.target.clientHeight - scroll.target.scrollTop;
    if (bottom == 0) {
      let page_ = page + 1;
      fetchData(page_);
      setPage(page_);
    }
  }
  return (
    <>
      <div onScroll={handleScrollling} style={{ overflowY: 'auto', height: '500px', width: '100%' }} >
        <table style={{ height: '650px', width: '100%' }}>
          <thead  >
            <tr >
              <th   >SN</th>
              <th  >Name</th>
              <th  >Gender</th>
              <th  >Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{ele.name}</td>
                  <td>{ele.gender}</td>
                  <td>
                    <img src={ele.image} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div >
    </>
  );
}
export default Scrolling;





