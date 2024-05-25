

const toggle = (element) => {
  const content = element.nextElementSibling; // Get the corresponding content

  // Toggle the display of the content
  console.log(element);

  const allPlus = document.querySelectorAll(".plus")

  const allContents = document.querySelectorAll(".content");

  const plus = element.querySelector(".plus");

  // getPlus.innerText = getPlus.innerText === "+" ? "-" : "+";

  if (content.style.display == "none" || content.style.display == "") {
    content.style.display = "block";
    plus.textContent = "-";
  } else {
    content.style.display = "none";
   plus.textContent = "+";
  }

  allContents.forEach((contents) => {
    if (contents != content) {
      contents.style.display = "none";
    }
  });

  allPlus.forEach((pluses) => {
    if (pluses != plus) {
       pluses.textContent = "+";
    }
  })
};

// document.getElementById("downloadBtn").addEventListener("click", () => {
//   // The relative path to your Excel file
//   const fileUrl =
//     "../merged_predicted_data.csv";
//   const a = document.createElement("a");
//   a.href = fileUrl;
//   a.download = "Predicted_Cases.csv"; // The name to save the file as
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// });

