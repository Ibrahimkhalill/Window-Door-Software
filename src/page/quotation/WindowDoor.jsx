/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./windowdoor.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import { useReactToPrint } from "react-to-print";
import QuotationPDF from "../../components/QuotationPDF";
// import html2pdf from "html2pdf.js";
import html3pdf from "html3pdf";
import { width } from "@mui/system";
import { useReactToPrint } from "react-to-print";
const WindowDoor = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  const componentRef = useRef();

  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setTotalPageNumber] = useState(0);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  // const generatePdf = () => {
  //   const content = componentRef.current;

  //   html3pdf().from(content).save("quotation.pdf");
  // };

  const generatePdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const [visible, setVisible] = useState([]);
  const [visibleContent, setVisibleContent] = useState(false);
  const [visibleSave, setVisibleSave] = useState(false);
  const location = useLocation();
  const [vat, setVatData] = useState([]);
  const [ProfileInstalltionData, setProfileInstalltionData] = useState([]);
  const [GlassInstalltionData, setGlassInstalltionData] = useState([]);
  const [MosquitoInstalltionData, setMosquitoInstalltionData] = useState([]);
  const [Material, setMaterial] = useState("");
  const [MosquitoNet_Design, setMosquitoNet_Design] = useState("");
  const [Mosquito_Net_Color, setMosquito_Net_Color] = useState("");
  const [Glass_Color, setGlass_Color] = useState("");
  const [Glass_Thickness, setGlass_Thickness] = useState("");
  const [MaterialPrice, setMaterialPrice] = useState([]);
  const [MosquitoNetDesignPrice, setMosquitoNetDesignPrice] = useState([]);
  const [GlassPrice, setGlassPrice] = useState([]);
  const [design, setDesign] = useState([]);
  const [MosquitoNetColor, setMosquitoNetColor] = useState([]);
  const [MosquitoNetDesign, setMosquitoNetDesign] = useState([]);
  const [glassthickness, setGlassThickness] = useState([]);
  const [glassColor, setGlassColor] = useState([]);
  const [quotationNo, setQuotationNo] = useState([]);
  const [pdfVisible, setPdfVisible] = useState(true);
  const [saveVisible, setSaveVisible] = useState(false);

  const { customerName, category, Profilecolor, customerData } =
    location.state || {};

  const Bywhom = localStorage.getItem("username");

  const [windowData, setWindowData] = useState([]);
  const handleAddWindow = () => {
    // Add a new window object to windowData
    setWindowData((prevWindowData) => {
      const newWindowData = [
        ...prevWindowData,
        {
          Material: "",
          MosquitoNet_Design: "",
          Mosquito_Net_Color: "",
          Glass_Color: "",
          Glass_Thickness: "",
          Height: "",
          Width: "",
          Quantity: "",
          Total_Price: "",
          Price_After_discount: "",
        },
      ];
      return newWindowData;
    });
  };

  const handleVisible = () => {
    setVisibleContent(true);
    setVisible((prevVisibleStates) => [...prevVisibleStates, true]);
    handleAddWindow();
  };

  const handleVisibleSave = () => {
    if (!visibleContent) {
      toast.dismiss();
      toast.warning("Plaese Setup window Door");
      return;
    }
    if (windowData.length === 0) {
      toast.dismiss();
      toast.warning("Please filup all field");
      return;
    }
    const hasEmptyFields = windowData.some(
      (item) =>
        item.Material === "" ||
        item.Glass_Color === "" ||
        item.Glass_Thickness === "" ||
        item.Height === "" ||
        item.Width === "" ||
        item.Total_Price === "" ||
        item.Price_After_discount === ""
    );

    // If any field is empty, display an error message and return
    if (hasEmptyFields && Material !== "fix window") {
      toast.dismiss();
      toast.warning("Please fill in all fields before saving.");
      return;
    }
    setVisibleSave(true);

    // toast("This Feacture will be updated later");
  };
  const fetchQuotationData = async () => {
    try {
      // Send a GET request to fetch the last quotation number
      const response = await axiosInstance.get(
        `quotationClone/getLastQuotationNo`
      );

      // Extract the quotation number from the response data
      const currentQuotationNo = response.data[0][0].Quotation_no;

      // Increment the quotation number by 1
      const nextQuotationNo = parseInt(currentQuotationNo) + 1;

      // Set the next quotation number to the state variable
      setQuotationNo(nextQuotationNo);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchVatData = async () => {
      try {
        const response = await axiosInstance.get(`/vat/getAll`);

        setVatData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProfileInstalltionData = async () => {
      try {
        const response = await axiosInstance.get(
          `/installation/getInstallationByTypeProfile`
        );

        setProfileInstalltionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchGlassInstalltionData = async () => {
      try {
        const response = await axiosInstance.get(
          `/installation/getInstallationByTypeMosquitoNet`
        );

        setMosquitoInstalltionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchMosQuitoInstalltionData = async () => {
      try {
        const response = await axiosInstance.get(
          `/installation/getInstallationByTypeGlass`
        );

        setGlassInstalltionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVatData();
    fetchProfileInstalltionData();
    fetchGlassInstalltionData();
    fetchMosQuitoInstalltionData();
    fetchQuotationData();
  }, []);

  useEffect(() => {
    const fetchMaterialPrice = async () => {
      try {
        const response = await axiosInstance.get(
          `/material/getPriceAndMaxDiscountByMaterialCategoryColour?Material=${Material}&Category=${category}&Colour=${Profilecolor}`
        );
        console.log("material", response.data);
        setMaterialPrice(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMosquitoPrice = async () => {
      try {
        const response = await axiosInstance.get(
          `/mosquitonetting/getPriceFromMosquitoNettingByDesignColour?Design=${MosquitoNet_Design}&Colour=${Mosquito_Net_Color}`
        );
        console.log("mos", response.data);
        setMosquitoNetDesignPrice(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchGlassPrice = async () => {
      try {
        const response = await axiosInstance.get(
          `/glass/getDistinctPriceFromGlassTableByGlassAndColour?Glass=${Glass_Thickness}&Colour=${Glass_Color}`
        );
        console.log("response.data", response.data[0]);
        setGlassPrice(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMaterialDesignFetch = async () => {
      try {
        const response = await axiosInstance.get(
          `/material/getDistinctMaterialFromMaterialTableByCategory?Category=${category}`
        );

        setDesign(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMosQuitoNetDesign = async () => {
      try {
        const response = await axiosInstance.get(
          `/mosquitonetting/getDistinctDesignFromMosquitoNetting`
        );

        setMosquitoNetDesign(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMosquitoColor = async () => {
      try {
        const response = await axiosInstance.get(
          `/mosquitonetting/getDistinctColourFromMosquitoNetting`
        );

        setMosquitoNetColor(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchGlassColor = async () => {
      try {
        const response = await axiosInstance.get(
          `/glass/getDistinctColourFromGlassTable`
        );

        setGlassColor(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchGlassThickness = async () => {
      try {
        const response = await axiosInstance.get(
          `http://194.233.87.22:1001/api/glass/getDistinctGlassFromGlassTable`
        );

        setGlassThickness(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMosQuitoNetDesign();
    fetchMaterialPrice();
    fetchMosquitoPrice();
    fetchGlassPrice();
    fetchMaterialDesignFetch();
    fetchGlassColor();
    fetchGlassThickness();
    fetchMosquitoColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    Glass_Color,
    Glass_Thickness,
    Material,
    MosquitoNet_Design,
    Mosquito_Net_Color,
    Profilecolor,
    category,
  ]);

  const handleChange = (index, field, value) => {
    const updatedData = [...windowData];
    updatedData[index][field] = value;

    // Calculate Total_Price for the specific window
    let sum =
      parseFloat(MaterialPrice[0]?.Price || 0) +
        parseFloat(MosquitoNetDesignPrice[0]?.Price) ||
      0 + parseFloat(GlassPrice[0]?.Price || 0);

    let area =
      parseFloat(updatedData[index].Height) *
      parseFloat(updatedData[index].Width);

    if (area < 1000000) {
      let Total = (sum * 1000000) / 1000000;
      updatedData[index].Total_Price =
        parseFloat(Total) * parseInt(updatedData[index].Quantity);
      updatedData[index].Price_After_discount = parseFloat(
        updatedData[index].Total_Price -
          (parseFloat(MaterialPrice[0]?.MaxDiscount) * 1000000) / 1000000
      ).toFixed(2);
    } else {
      let Total = (sum * area) / 1000000;
      console.log(Total);
      updatedData[index].Total_Price =
        parseFloat(Total) * parseInt(updatedData[index].Quantity);
      updatedData[index].Price_After_discount = parseFloat(
        updatedData[index].Total_Price -
          (parseFloat(MaterialPrice[0]?.MaxDiscount) *
            parseFloat(updatedData[index].Height) *
            parseFloat(updatedData[index].Width)) /
            1000000
      ).toFixed(2);
    }

    setWindowData(updatedData);
  };


  const totalPriceSum = windowData.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.Price_After_discount || 0),
    0
  );
  const installation =
    parseFloat(MosquitoInstalltionData[0]?.Installation) +
    parseFloat(ProfileInstalltionData[0]?.Installation) +
    (parseFloat(GlassInstalltionData[0]?.Installation) || 0);
  const vatRate = vat[0]?.Vat;

  const TotalInstallation = windowData.reduce((accumulator, currentValue) => {
    const area =
      parseFloat(currentValue.Height) * parseFloat(currentValue.Width);
    const TotalArea = area < 1000000 ? 1000000 : area;
    return (
      accumulator +
      (TotalArea * parseInt(currentValue.Quantity) * installation) / 1000000
    );
  }, 0);

  const vatAmount = (
    (totalPriceSum + TotalInstallation) *
    (parseFloat(vatRate) / 100)
  ).toFixed(2);

  ///save data

  const handleSaveBulk = async () => {
    const newTransactions = windowData.map((item) => {
      return {
        Quotation_no: quotationNo.toString(), // Convert to string
        Customer_id: customerName, // Assuming customerName is available
        Item: `${item.Material}\nWith MosquitoNet Design: ${item.MosquitoNet_Design}\nWith MosquitoNet Color: ${item.Mosquito_Net_Color}\nWith Glass Color: ${item.Glass_Color}\nWith Glass Thickness: ${item.Glass_Thickness}\nTotal Height: ${item.Height}\nTotal Width: ${item.Width}`, // Concatenate strings and add line breaks
        Quantity: item.Quantity.toString(),
        Price: item.Price_After_discount.toString(), // Convert to string
        Total_Price: item.Total_Price,
        byWhom: Bywhom, // Assuming Bywhom is available
        Material: item.Material,
        MosquitoNet_Design: item.MosquitoNet_Design,
        Mosquito_Net_Color: item.Mosquito_Net_Color,
        Glass_Color: item.Glass_Color,
        Glass_Thickness: item.Glass_Thickness,
        Height: item.Height,
        Width: item.Width,
        Profile: category,
        ProfileColor: Profilecolor,
        MaxDiscount: MaterialPrice[0]?.MaxDiscount,
      };
    });

    try {
      console.log(newTransactions);
      const response = await axiosInstance.post(
        "/quotationClone/postQuotationBulk",
        newTransactions, // This is the data you want to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSaveVisible(true);
        setPdfVisible(false);
        toast.success(`${quotationNo} Quotation saved successfully!`);
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save data. Please try again later");
    }
  };

  return (
    <div className="window_door_container">
      <ToastContainer autoClose={1000} />
      {!visibleSave ? (
        <>
          <div className="window_door_button">
            <h4>Window Door</h4>
            <button onClick={handleVisible}>+</button>
          </div>
          {visibleContent && (
            <div className="mian_content_container_window_door">
              {visible.map(
                (isVisible, index) =>
                  isVisible && (
                    <div key={index} className="main_content_window_door">
                      <select
                        value={window.Material}
                        onChange={(e) => {
                          handleChange(index, "Material", e.target.value);
                          setMaterial(e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Select Design
                        </option>
                        {design &&
                          design.map((data) => (
                            <option>{data.Material}</option>
                          ))}
                      </select>
                      <select
                        value={window.MosquitoNet_Design}
                        onChange={(e) => {
                          handleChange(
                            index,
                            "MosquitoNet_Design",
                            e.target.value
                          );
                          setMosquitoNet_Design(e.target.value);
                        }}
                        // disabled={Material === "fix window" ? true : false}
                      >
                        <option value="" disabled selected>
                          Select MosquitoNet Design
                        </option>
                        {MosquitoNetDesign &&
                          MosquitoNetDesign.map((data) => (
                            <option>{data.Design}</option>
                          ))}
                      </select>
                      <select
                        value={window.Mosquito_Net_Color}
                        onChange={(e) => {
                          handleChange(
                            index,
                            "Mosquito_Net_Color",
                            e.target.value
                          );
                          setMosquito_Net_Color(e.target.value);
                        }}
                        // disabled={Material === "fix window" ? true : false}
                      >
                        <option value="" disabled selected>
                          Select MosquitoNet Color
                        </option>

                        {MosquitoNetColor &&
                          MosquitoNetColor.map((data) => (
                            <option>{data.Colour}</option>
                          ))}
                      </select>
                      <select
                        value={window.Glass_Color}
                        onChange={(e) => {
                          handleChange(index, "Glass_Color", e.target.value);
                          setGlass_Color(e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Select Glass Color
                        </option>

                        {glassColor &&
                          glassColor.map((data) => (
                            <option>{data.Colour}</option>
                          ))}
                      </select>
                      <select
                        value={window.Glass_Thickness}
                        onChange={(e) => {
                          handleChange(
                            index,
                            "Glass_Thickness",
                            e.target.value
                          );
                          setGlass_Thickness(e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Select Glass Thickness
                        </option>
                        {glassthickness &&
                          glassthickness.map((data) => (
                            <option>{data.Glass}</option>
                          ))}
                      </select>
                      <input
                        type="number"
                        value={window.Height}
                        onChange={(e) => {
                          handleChange(index, "Height", e.target.value);
                        }}
                        placeholder="Height"
                      />
                      <input
                        type="number"
                        value={window.Width}
                        onChange={(e) => {
                          handleChange(index, "Width", e.target.value);
                        }}
                        placeholder="Width"
                      />
                      <input
                        type="number"
                        value={window.Width}
                        onChange={(e) => {
                          handleChange(index, "Quantity", e.target.value);
                        }}
                        placeholder="Enter Quantity"
                      />
                    </div>
                  )
              )}
            </div>
          )}

          <div className="next_buttton_window_door">
            <button onClick={handleVisibleSave}>Next</button>
          </div>
        </>
      ) : (
        <div className="save_section_quotation">
          <div className="main_content_quotation">
            {windowData &&
              windowData.map((data, index) => (
                <div key={index} className="description_quotation">
                  <div>{data.Material}</div>
                  {data.MosquitoNet_Design && (
                    <div>
                      With MosquitoNet Design: {data.MosquitoNet_Design}
                    </div>
                  )}
                  {data.Mosquito_Net_Color && (
                    <div>
                      With MosquitoNet Color : {data.Mosquito_Net_Color}
                    </div>
                  )}
                  <div>With Glass Color : {data.Glass_Color}</div>
                  <div>With Glass Thickness : {data.Glass_Thickness}</div>
                  <div>Total Height :{data.Height}</div>
                  <div>Total Width : {data.Width}</div>
                  <div>Quantity : {data.Quantity}</div>
                  <div>Total Price : {data.Total_Price}</div>
                  <div>Price After Discount : {data.Price_After_discount}</div>
                </div>
              ))}
          </div>
          <div className="save_pdf_button_quotation">
            <div className="vat_installation_quotation">
              <div className="vat_div">
                Vat({vat[0].Vat}): {parseFloat(vatAmount)}
              </div>
              <div className="Installation_div">
                Installation : {TotalInstallation.toFixed(2)}
              </div>
            </div>
            <div className="save_pdf_button">
              <button
                onClick={handleSaveBulk}
                className={saveVisible ? "disabled" : ""}
                disabled={saveVisible}
                style={{ cursor: saveVisible ? "not-allowed" : "pointer" }}
              >
                SAVE
              </button>
              <div style={{ display: "none" }}>
                <QuotationPDF
                  ref={componentRef}
                  pageNumber={pageNumber}
                  windowData={windowData}
                  vat={vatAmount}
                  installation={TotalInstallation}
                  customerName={customerName}
                  quotationNo={quotationNo}
                  totalPrice={totalPriceSum}
                  customerData={customerData}
                />
              </div>
              <button
                onClick={generatePdf}
                style={{ cursor: pdfVisible ? "not-allowed" : "pointer" }}
                disabled={pdfVisible}
              >
                PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WindowDoor;
