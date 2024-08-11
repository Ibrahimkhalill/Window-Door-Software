import React from "react";
import "./quotationreport.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { RiSlideshow3Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import RegenaratePDF from "../../components/RegenaratePDF";
import html3pdf from "html3pdf";
import { useReactToPrint } from "react-to-print";

const QuotationReport = () => {
  const [quotationNo, setQuotationNo] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [Data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);
  const [uniqueQuotationNos, setUniqueQuotationNos] = useState([]);
  const [uniqueCustomerIds, setUniqueCustomerIds] = useState([]);
  const [FilterItemData, setFiltereItemData] = useState([]);
  const [selectedID, setSelectedID] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [pageNumber, setTotalPageNumber] = useState(0);
  const [CustomerData, setCustomerData] = useState([]);
  const user = localStorage.getItem("username");

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  // const componentRef = useRef();

  // const generatePdf = () => {
  //   const content = componentRef.current;

  //   // Set page size options
  //   const options = {
  //     filename: "quotation.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     margin: 5.4,
  //     jsPDF: {
  //       format: "a4",
  //       orientation: "portrait",
  //     },
  //     onAfterSave: (pdf) => {
  //       const numPages = pdf.internal.getNumberOfPages();
  //       setTotalPageNumber(numPages);
  //     },
  //   };

  //   // Generate PDF with specified options
  //   html3pdf().from(content).set(options).save();
  // };
  const componentRef = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentRef.current,

  });
  // http://194.233.87.22:1001/api/quotation/getAll

  const fatchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("quotationClone/getAll");
      console.log(response);
      const res_Data = response.data;

      setData(res_Data);
      console.log("res_Data", res_Data);
      setFilteredData([...new Set(res_Data)]);

      const uniqueQuotationNos = [
        ...new Set(res_Data.map((item) => item.Quotation_no)),
      ];
      setUniqueQuotationNos(uniqueQuotationNos);

      const uniqueCustomerIds = [
        ...new Set(res_Data.map((item) => item.Customer_id)),
      ];
      setUniqueCustomerIds(uniqueCustomerIds);
      setIsLoading(false);
      //   setFiltereData([...new Set(res_Data)]);
      setQuotationNo("");
      setCustomerId("");
      setSelectedID(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowAll = () => {
    fatchUserData();
    setButtonVisible(false);
  };

  useEffect(() => {
    fatchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quotation search
  const handleFilterQuotation = () => {
    if (!quotationNo || typeof quotationNo !== "string") {
      if (!quotationNo) {
        toast.warning("Do not field Blanck");
      }
      return;
    }
    const filterData = filterdData.filter(
      (item) => item.Quotation_no === quotationNo
    );
    if (filterData.length === 0) {
      toast.error("Input data not valid");
    }
    setData(filterData);
    setButtonVisible(true);
  };

  // Customer search
  const handleFilterCustomer = () => {
    if (!customerId || typeof customerId !== "string") {
      if (!customerId) {
        toast.warning("Do not field Blanck");
      }
      return;
    }
    const filterData = filterdData.filter(
      (item) => item.Customer_id === customerId
    );
    if (filterData.length === 0) {
      toast.error("Input data not valid");
    }
    setData(filterData);
    setButtonVisible(false);
  };

  const hendleDataInputField = (item) => {
    if (item.id === selectedID) {
      setSelectedID("");
      return;
    }
    setSelectedID(item.id);
  };

  const FilterItemsData = (Data) => {
    // Ensure Data is always an array
    if (!Array.isArray(Data)) {
      Data = [Data];
    }

    const filteredDataArray = [];

    Data.forEach((item) => {
      // Ensure Item exists and is a string
      if (item && typeof item.Item === "string") {
        // const lines = item.Item.split("\n");
        const lines = item.Item.trim().split(/\n+/);
        const material = lines.shift();

        const extractedData = {};
        lines.forEach((line) => {
          const [key, value] = line.split(" : ");
          if (key && value) {
            const formattedKey = key.trim().replace(/\s+/g, "_"); // Replace spaces with underscores
            extractedData[formattedKey] = value.trim();
          }
        });

        filteredDataArray.push({
          material,
          ...extractedData,
        });
      }
    });

    return filteredDataArray;
  };

  useEffect(() => {
    if (Data.length > 0) {
      const filteredData = FilterItemsData(Data);
      setFiltereItemData(filteredData);
      console.log("filteredData", filteredData);
    }
  }, [Data]);

  const fatchDataItems = FilterItemData.map((item) => ({
    totalHeight: item.Total_Height,
    totalWidth: item.Total_Width,
    material: item.material,
    with_Glass_Color: item.with_Glass_Color,
    with_Glass_Thickness: item.with_Glass_Thickness,
    with_MosquitoNet_Color: item.with_MosquitoNet_Color,
    with_MosquitoNet_Design: item.with_MosquitoNet_Design,
  }));
  console.log("fatchDataItems", fatchDataItems);

  const materialData = [];
  fatchDataItems.forEach((item) => {
    console.log("Material:", item.material);
    materialData.push(item.material); // Store material property in another variable
  });

  const [vatData, setVatData] = useState([]);
  const [ProfileInstalltionData, setProfileInstalltionData] = useState([]);
  const [MosquitoInstalltionData, setMosquitoInstalltionData] = useState([]);
  const [GlassInstalltionData, setGlassInstalltionData] = useState([]);
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

    // glass installtion
    const fetchMosQuitoInstalltionData = async () => {
      try {
        const response = await axiosInstance.get(
          `/installation/getInstallationByTypeMosquitoNet`
        );

        setMosquitoInstalltionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchGlassInstalltionData = async () => {
      try {
        const response = await axiosInstance.get(
          `/installation/getInstallationByTypeGlass`
        );

        setGlassInstalltionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get(
          `/customer/getAllByWhom?ByWhom=${user}`
        );
        console.log(response.data);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCustomerData();
    fetchVatData();
    fetchProfileInstalltionData();
    fetchGlassInstalltionData();
    fetchMosQuitoInstalltionData();
  }, []);

  
  const totalPriceSum = Data.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.Price || 0),
    0
  );
  const installation =
    parseFloat(MosquitoInstalltionData[0]?.Installation) +
    parseFloat(ProfileInstalltionData[0]?.Installation) +
    (parseFloat(GlassInstalltionData[0]?.Installation) || 0);
  const vatRate = vatData[0]?.Vat;

  const TotalInstallation = Data.reduce((accumulator, currentValue) => {
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
  return (
    <div className="moda_quotation_report">
      <span className="quotation">Quotation Report</span>
      <ToastContainer stacked autoClose={500} />
      <div className="container_frist_moda_quotation_report">
        <div className="container_div_moda_quotation_report">
          <div className="input_field_moda_quation_report">
            <label htmlFor="">Quotation No</label>
            <input
              value={quotationNo}
              onChange={(event) => setQuotationNo(event.target.value)}
              list="quotation"
            />
            <datalist id="quotation">
              {uniqueQuotationNos.length > 0 &&
                uniqueQuotationNos.map((items, index) => {
                  return <option key={index}>{items}</option>;
                })}
            </datalist>
            <button onClick={handleFilterQuotation}>Search</button>
          </div>
          <div className="input_field_moda_quation_report">
            <label htmlFor="">Customer Id</label>
            <input
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              list="customer"
            />
            <datalist id="customer">
              {uniqueCustomerIds.length > 0 &&
                uniqueCustomerIds.map((items, index) => {
                  return <option key={index}>{items}</option>;
                })}
            </datalist>
            <button onClick={handleFilterCustomer}>Search</button>
          </div>
        </div>
        <div className="separated_moda_quotation">
          {buttonVisible && (
            <div className="container_button_moda_quotation_report_showall effecttop">
              <div style={{ display: "none" }}>
                <RegenaratePDF
                  ref={componentRef}
                  pageNumber={pageNumber}
                  Data={Data}
                  vatAmount={vatAmount}
                  totalPriceSum={totalPriceSum}
                  TotalInstallation={TotalInstallation}
                  CustomerData={CustomerData}
                />
              </div>
              <button onClick={generatePdf} className="button">
                <FaFilePdf />
              </button>
              <span>Regenerate PDF</span>
            </div>
          )}
          <div className="container_button_moda_quotation_report_showall">
            <button onClick={handleShowAll} className="button">
              <RiSlideshow3Fill />
            </button>
            <span>Show All</span>
          </div>
        </div>
      </div>
      <div className="container_second_moda_quotation_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="container_table_row_div">
            <table>
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Quotation No</th>
                  <th>Customer Id</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>ByWhom</th>
                </tr>
              </thead>
              <tbody>
                {Data.length > 0 &&
                  Data.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => hendleDataInputField(item)}
                      className={
                        selectedID === item.id ? "selectedData" : "hovereffect"
                      }
                      tabindex="0"
                    >
                      <td>{item.id}</td>
                      <td>{item.Quotation_no}</td>
                      <td>{item.Customer_id}</td>
                      <td>{item.Item}</td>
                      <td>{item.Price}</td>
                      <td>{item.byWhom}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationReport;
