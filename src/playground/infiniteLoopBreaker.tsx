import React, { useEffect, useState } from "react";

const CountInputChanges = () => {
  const [value, setValue] = useState('');
  //const countRef: any = useRef(0);

  useEffect(() => {
    //countRef.current++;
    console.log(value);
  }, [value]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={onChange} />
      {/* <div>Number of changes: {countRef.current}</div> */}
      <p>{value}</p>
    </div>
  );
};
// type MyProps = { ...};
// type MyState = { value: string };

// class CountInputChanges extends React.Component<any, any> {
//     constructor(props: any) {
//       super(props);
//       this.state = {value: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event: any) {
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event: any) {
//       alert('A name was submitted: ' + this.state.value);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }

export default CountInputChanges;
