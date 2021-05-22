
const Input_a = document.getElementById("Input-A");
const Input_b = document.getElementById("Input-B");
const Input_c = document.getElementById("Input-C");
const Input_d = document.getElementById("Input-D");




// qustion 1a
const vuvuzela = (a, b, c) => {
    a = parseInt(a);
    b = parseInt(b);
    if ((c != "+" || "-" || "/" || "*")) {
      return 0;
    }
  
    let result = `${a}  ${c}  ${b}`;
    result = eval(result)
    return result;
  };
  

//   eval(vuvuzela(2, 4, "/"))
  
  const Ans = () => {
    vuvuzela(Input_a, Input_b, Input_c)

  }