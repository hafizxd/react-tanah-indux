import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutUPT from "../../components/Layout/layoutUPT";
import { DeleteConfirmation } from "../../components/UPTDashboard/DeleteConfirmation";
import { UPTDashboardTableRow } from "../../components/UPTDashboard/UPTDashboardTableRow";

export const TanahIndukUPT = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [openEditTanah, setOpenEditTanah] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //format date into yyyy-mm-dd with leading zero
  const formatDate = (date) => {
      const d = new Date(date);
      const month = `${d.getMonth() + 1}`.padStart(2, "0");
      const day = `${d.getDate()}`.padStart(2, "0");
      const year = d.getFullYear();
      console.log([year, month, day].join("-"));
      return [year, month, day].join("-");
  };

  const [urlDelete, setUrlDelete] = useState("");
  const [triggerDeleted, setTriggerDeleted] = useState(false);
  const [emptyMsg, setEmptyMsg] = useState("");

  const [formData, setFormData] = useState({
      sertifikatNomor: "",
      hakPakaiTanggal: "",
      namaJenisBarang: "",
      nilaiAset: "",
      alamat: "",
      luas: "",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          let token = localStorage.getItem("token");

          try {
              let res = await fetch(
                  apiUrl + "parent",
                  {
                      method: "GET",
                      headers: {
                          "Content-type": "application/json; charset=UTF-8",
                          Authorization: "Bearer " + token,
                      },
                  }
              );

              let resJson = await res.json();

              if (res.status != 200) {
                  return console.log(resJson.message);
              }

              let resData = resJson.data.data;

              if (resData.length == 0) {
                  return setEmptyMsg("Tidak ada data.");
              }

              setEmptyMsg("");
              setData(resData);
          } catch (error) {
              console.log(error);
          }
      };

      fetchData().catch(console.error);
  }, [params.id, triggerDeleted]);

  const toggleEditTanah = () => {
      if (openEditTanah) {
          // setNavbarInfo("")
          setOpenEditTanah(false);
      } else {
          // setNavbarInfo("/Tambah Total Tanah")
          setOpenEditTanah(true);
      }
  };

  return (
      <LayoutUPT>
          {!openEditTanah ? (
              <>
                  <div className="d-flex flex-row justify-content-between px-3 py-3">
                      <div
                          className="secondary-btn d-flex align-items-center"
                          style={{ padding: "0 15px" }}
                      >
                          Import
                      </div>
                      <div className="d-flex">
                          <input
                              className="form-control me-2 bg-none"
                              style={{ width: "200px" }}
                              type="search"
                              placeholder="Search"
                              aria-label="Search"
                          ></input>
                          <Link
                              to={"/upt/" + params.id + "/upt/tambah-induk"}
                              className="primary-btn d-flex justify-content-center align-items-center"
                          >
                              Tambah Induk
                          </Link>
                      </div>
                  </div>

                  <div className="upt-dashboard-table">
                      <div className="row m-0">
                          {emptyMsg == "" ? (
                              <>
                                  {data.map((item) => {
                                      return (
                                          <UPTDashboardTableRow
                                              upt={params.id}
                                              key={item.id}
                                              id={item.id}
                                              sertifikatNomor={
                                                  item.certificate_number
                                              }
                                              hakPakaiTanggal={
                                                  item.certificate_date
                                              }
                                              namaJenisBarang={item.item_name}
                                              nilaiAset={item.asset_value}
                                              alamat={item.address}
                                              luas={item.large}
                                              handleShow={handleShow}
                                              toggleTambahTanah={
                                                  toggleEditTanah
                                              }
                                              setFormData={setFormData}
                                              urlDeleteStateChanger={
                                                  setUrlDelete
                                              }
                                          />
                                      );
                                  })}
                              </>
                          ) : (
                              <>
                                  <div class="text-center">{emptyMsg}</div>
                              </>
                          )}
                      </div>
                  </div>
                  <DeleteConfirmation
                      show={show}
                      handleClose={handleClose}
                      urlDelete={urlDelete}
                      urlRedirect={null}
                      triggerDeleted={triggerDeleted}
                      setTriggerDeleted={setTriggerDeleted}
                  />
              </>
          ) : (
              <>
                  <div
                      className="d-flex justify-content-between align-items-center mx-3 py-3"
                      style={{
                          borderBottom: "#BCBCBC 1px solid",
                      }}
                  >
                      <div
                          className="font-semibold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                              toggleEditTanah();
                          }}
                      >
                          &larr; &emsp; Kembali
                      </div>
                      <div className="d-flex gap-2">
                          <div
                              onClick={() => {
                                  toggleEditTanah();
                              }}
                              className="text-center"
                              style={{
                                  cursor: "pointer",
                                  border: "#DC2F2F 1px solid",
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  color: "#DC2F2F",
                                  width: "120px",
                              }}
                          >
                              Batal
                          </div>
                          <div className="primary-btn">Simpan</div>
                      </div>
                  </div>
                  <div className="m-3">
                      <h5 style={{ paddingBottom: "20px" }}>
                          Edit Tanah Induk
                      </h5>
                      <form className="form-tambah-tanah d-flex flex-col gap-3 px-5">
                          <div>
                              <label htmlFor="nama-jenis-barang">
                                  Nama/Jenis Barang
                              </label>
                              <input
                                  type="text"
                                  className="w-100"
                                  name="nama-jenis-barang"
                                  value={formData.namaJenisBarang}
                              />
                          </div>
                          <div>
                              <label htmlFor="nilai-aset">Nilai Aset</label>
                              <input
                                  type="text"
                                  className="w-100"
                                  name="nilai-aset"
                                  value={formData.nilaiAset}
                              />
                          </div>
                          <div>
                              <p className="p-0 m-0">Sertifikat</p>
                              <div className="d-flex gap-2">
                                  <div className="d-flex flex-col">
                                      <label htmlFor="sertifikat-nomor">
                                          Nomor
                                      </label>
                                      <input
                                          type="text"
                                          id="sertifikat-nomor"
                                          style={{ width: "100px" }}
                                          value={formData.sertifikatNomor}
                                      />
                                  </div>
                                  <div className="d-flex flex-col">
                                      <label htmlFor="sertifikat-tanggal">
                                          Tanggal
                                      </label>
                                      <input
                                          type="date"
                                          id="sertifikat-tanggal"
                                          style={{ width: "fit-content" }}
                                          value={formatDate(
                                              formData.hakPakaiTanggal
                                          )}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="sertifikat-alamat">
                                  Alamat
                              </label>
                              <textarea
                                  name="sertifikat-alamat"
                                  className="w-100"
                                  defaultValue={formData.alamat}
                              ></textarea>
                          </div>
                          <div>
                              <label htmlFor="sertifikat-luas">
                                  Luas Induk
                              </label>
                              <input
                                  type="text"
                                  className="w-100"
                                  name="sertifikat-luas"
                                  value={formData.luas}
                              />
                          </div>
                      </form>
                  </div>
              </>
          )}
      </LayoutUPT>
  );
};
