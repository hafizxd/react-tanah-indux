import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LayoutAdmin from "../../components/Layout/layoutAdmin";
import { ModalTambahBagian } from "../../components/Modal/ModalTambahBagian";
import { ButtonDelete } from "../../components/Button/ButtonDelete";
import { TableBagian } from "../../components/Table/TableBagian";
import { TableBagianPinjamPakai } from "../../components/Table/TabelBagianPinjamPakai";

export const DetailIndukAdmin = ({ induk_id }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
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
        return [year, month, day].join("-");
    };

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const [induk, setInduk] = useState({});
    const [children, setChildren] = useState([]);
    const [emptyMsg, setEmptyMsg] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("token");

        const fetchInduk = async () => {
            try {
                let res = await fetch(apiUrl + "parent/" + params.induk_id, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer " + token,
                    },
                });

                let resJson = await res.json();

                if (res.status != 200) {
                    return console.log(resJson.message);
                }

                let resData = resJson.data;
                setInduk(resData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchChildren = async () => {
            try {
                let res = await fetch(
                    apiUrl + "childer/all?parent_id=" + params.induk_id,
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
                if (resData.length == 0) return setEmptyMsg("Tidak ada data");

                setEmptyMsg("");

                setChildren(resData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInduk().catch(console.error);
        fetchChildren().catch(console.error);
    }, []);

    return (
        <LayoutAdmin>
            <ModalTambahBagian
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            />
            <div className="mx-3">
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
                            navigate(-1);
                        }}
                    >
                        &larr; &emsp; Kembali
                    </div>
                </div>
                <div
                    className="d-flex justify-content-between mx-3"
                    style={{ paddingBottom: "20px", paddingTop: "10px" }}
                >
                    <h5>Informasi Tanah Bidang</h5>
                    <div className="d-flex gap-2">
                        <ButtonDelete
                            urlDelete={
                                apiUrl + "parent/delete/" + params.induk_id
                            }
                            urlRedirect={"/upt/" + params.id + "/admin"}
                        />
                        <Link
                            to={
                                "/upt/" +
                                params.id +
                                "/admin/edit-induk/" +
                                params.induk_id
                            }
                            className="primary-btn px-4"
                        >
                            Ubah Data
                        </Link>
                    </div>
                </div>
                <div className="informasi-tanah">
                    <div className="d-flex mx-4">
                        <div className="left">
                            <div>
                                <p className="title p-0 m-0">
                                    Nama/Jenis Barang
                                </p>
                                <p className="font-semibold">
                                    {induk.item_name}
                                </p>
                            </div>
                            <div>
                                <p className="title p-0 m-0">Nilai Aset</p>
                                <p className="font-semibold">
                                    {formatter.format(induk.asset_value)}
                                </p>
                            </div>
                            <h6>Sertifikat</h6>
                            <div className="d-flex gap-5">
                                <div className="left">
                                    <p className="title p-0 m-0">Nomor</p>
                                    <p className="font-semibold">
                                        {induk.certificate_number}
                                    </p>
                                </div>
                                <div className="right">
                                    <p className="title p-0 m-0">Tanggal</p>
                                    <p className="font-semibold">
                                        {formatDate(induk.certificate_date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div>
                                <p className="title p-0 m-0">Luas Induk (m)</p>
                                <p className="font-semibold">{induk.large}</p>
                            </div>
                            <div>
                                <p className="title p-0 m-0">Alamat</p>
                                <p className="font-semibold">{induk.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex justify-content-between align-items-center mx-3 py-3"
                    style={{
                        borderBottom: "#BCBCBC 1px solid",
                    }}
                ></div>
                <div className="mx-3">
                    <div
                        className="d-flex flex-row justify-content-between px-3 py-3"
                        style={{ marginTop: "30px" }}
                    >
                        <h5>Tanah Bagian</h5>
                        <div className="d-flex">
                            <input
                                className="form-control me-2 bg-none"
                                style={{ width: "200px" }}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            ></input>
                            <div
                                className="secondary-btn d-flex align-items-center me-2"
                                style={{ padding: "0 15px" }}
                            >
                                Import
                            </div>
                            <div
                                className="primary-btn d-flex justify-content-center align-items-center"
                                onClick={() => {
                                    setShow(true);
                                }}
                            >
                                Tambah Bagian
                            </div>
                        </div>
                    </div>
                    <div className="table-tanah-bagian">
                        {emptyMsg === "" ? (
                            children.map((item) => {
                                if (
                                    item.utilization_engagement_type ==
                                        "pinjam_pakai" ||
                                    item.utilization_engagement_type ==
                                        "pakai_sendiri"
                                ) {
                                    return (
                                        <TableBagianPinjamPakai
                                            upt={params.id}
                                            children={item}
                                        />
                                    );
                                } else if (
                                    item.utilization_engagement_type ==
                                        "sewa_sip_bmd" ||
                                    item.utilization_engagement_type ==
                                        "retribusi"
                                ) {
                                    return (
                                        <TableBagian
                                            upt={params.id}
                                            children={item}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <>
                                <div className="text-center">{emptyMsg}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
};
