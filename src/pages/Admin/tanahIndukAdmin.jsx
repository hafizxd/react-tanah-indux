import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutAdmin from "../../components/Layout/layoutAdmin";
import { DeleteConfirmation } from "../../components/UPTDashboard/DeleteConfirmation";
import { IndukTableRowAdmin } from "../../components/UPTDashboard/IndukTableRowAdmin";
import { UPTDashboardTableRow } from "../../components/UPTDashboard/UPTDashboardTableRow";

export const TanahIndukAdmin = () => {
  const [openEditTanah, setOpenEditTanah] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  // console.log(params);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  //format date into yyyy-mm-dd with leading zero
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    console.log([year, month, day].join("-"));
    return [year, month, day].join("-");
  };

  const [formData, setFormData] = useState({
    sertifikatNomor: "",
    hakPakaiTanggal: "",
    namaJenisBarang: "",
    nilaiAset: "",
    alamat: "",
    luas: "",
  });

  const [data, setData] = useState([]);

  useEffect(async () => {
    let res = await fetch(apiUrl + '');
  }, []);

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
    <LayoutAdmin>
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
                to={"/upt/" + params.id + "/admin/tambah-induk"}
                className="primary-btn d-flex justify-content-center align-items-center"
              >
                Tambah Induk
              </Link>
            </div>
          </div>

          <div className="upt-dashboard-table">
            <div className="row m-0">
              {data.map((item) => {
                return (
                  <IndukTableRowAdmin
                    upt={params.id}
                    key={item.id}
                    id={item.id}
                    sertifikatNomor={item.sertifikatNomor}
                    hakPakaiTanggal={item.hakPakaiTanggal}
                    namaJenisBarang={item.namaJenisBarang}
                    nilaiAset={item.nilaiAset}
                    alamat={item.alamat}
                    luas={item.luas}
                    handleShow={handleShow}
                    toggleTambahTanah={toggleEditTanah}
                    setFormData={setFormData}
                  />
                );
              })}
            </div>
          </div>
          <DeleteConfirmation show={show} handleClose={handleClose} />
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
            <h5 style={{ paddingBottom: "20px" }}>Edit Tanah Induk</h5>
            <form className="form-tambah-tanah d-flex flex-col gap-3 px-5">
              <div>
                <label htmlFor="nama-jenis-barang">Nama/Jenis Barang</label>
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
                    <label htmlFor="sertifikat-nomor">Nomor</label>
                    <input
                      type="text"
                      id="sertifikat-nomor"
                      style={{ width: "100px" }}
                      value={formData.sertifikatNomor}
                    />
                  </div>
                  <div className="d-flex flex-col">
                    <label htmlFor="sertifikat-tanggal">Tanggal</label>
                    <input
                      type="date"
                      id="sertifikat-tanggal"
                      style={{ width: "fit-content" }}
                      value={formatDate(formData.hakPakaiTanggal)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="sertifikat-alamat">Alamat</label>
                <textarea
                  name="sertifikat-alamat"
                  className="w-100"
                  defaultValue={formData.alamat}
                ></textarea>
              </div>
              <div>
                <label htmlFor="sertifikat-luas">Luas Induk</label>
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
    </LayoutAdmin>
  );
};
