// const dateInput = document.querySelector(".fromdate");
// const today = new Date();
// today.setFullYear(today.getFullYear() - 1);
// const formattedDate = today.toISOString().slice(0, 10);
// dateInput.value = formattedDate;

// document.querySelector(".todate").valueAsDate = new Date();


// // function randommap(){
// //       = Math.floor(Math.random() * 100);
// // }

// var flag = false;
// var myChart;
// const malariaData = document.getElementById('myChart');
// const chartContext = malariaData.getContext('2d');

// const h =2;

// function mapLoader() {
//     // randommap();

//     if(flag){
//         myChart.destroy();
//     }
    
//     // chart.destroy();
//     console.log( );
//   console.log("Hello ji Loading.....");
//   // Create a canvas element
//   const labels = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
// //   const data = {
// //     labels: labels,
// //     datasets: [
// //       {
// //         label: "Dataset 1",
// //         data:[  3,   5,   7,   8,   10,   12,   14,   16,   18,   20,   22,   24],
// //         backgroundColor: "",
// //         borderColor: "blue",
// //       },
// //       {
// //         label: "Dataset 2",
// //         data: [  5,   7,   9,   11,   13,   15,   17,   19,   21,   23,   25,   27],
// //         backgroundColor: "",
// //         borderColor: "red",
// //       },
// //     ],
// //   };
// //   const config = {
// //     type: "line",
// //     data: data,
// //     options: {
// //       maintainAspectRatio: false,
// //       responsive: false,
// //       title: {
// //         display: true,
// //         text: "Malaria data",
// //       },
// //     },
// //   };
// //    myChart = new Chart("myChart", config);


//    myChart = new Chart(chartContext, {
//     type: 'line',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'Malaria cases',
//             data:[  3,   5,   7,   8,   10,   12,   14,   16,   18,   20,   22,   24],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor:'rgba(75, 192, 192, 1)',
//         },
//         {
//             label:'Malaria Deaths',
//             data: [  5,   7,   9,   11,   13,   15,   17,   19,   21,   23,   25,   27],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor:'rgba(255, 99, 132, 1)',
//         }
//     ],


//     },
//     options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         title: {
//             display: true,
//             text: 'Malaria',
//         },
//     }

// });
//   flag = true;
// }

// window.addEventListener("resize", function () {
//   chart.resize();
// });

// mapLoader();

// Declare a variable to store the selected element
// let selected = document.querySelector('.Cases');
// console.log("run");
// // Define a function to underline the clicked element and remove the underline from the previous element
// function underline(element) {
   
//   console.log("Started")
//   // If there is a previous element, remove the underline style from it
//   if (selected) {
//     selected.style.textDecoration = 'none';
//   }
//   // Set the underline style for the clicked element
//   element.style.textDecoration = 'underline';
//   element.style.textDecorationColor = '#009ce1';
//   element.style.textDecorationThickness = '3px';
//   element.style.textUnderlineOffset = '5px';
//   // Update the selected element to the clicked element
//   selected = element;
//   console.log("Ended");
// }
