import { useState, useEffect } from "react";
import { DashboardTableRow } from "../../components/Dashboard/DashboardTableRow";
import LayoutAdmin from "../../components/Layout/layoutAdmin";

export const DashboardAdmin = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [dashboardData, setDashboardData] = useState([]);
    const [filterYear, setFilterYear] = useState('2022');
    const [emptyMsg, setEmptyMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("token");

            try {
                let res = await fetch(apiUrl + "dashboard/all/" + filterYear, {
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

                if (resData.length == 0) {
                    return setEmptyMsg("Tidak ada data.");
                }

                setEmptyMsg("");
                setDashboardData(resData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData().catch(console.error);
    }, [filterYear]);

    return (
        <LayoutAdmin>
            <div className="d-flex justify-content-between px-3 py-3">
                <select
                    value={filterYear}
                    onChange={(e) => {
                        setFilterYear(e.target.value);
                    }}
                    className="h-100 rounded text-cyanblue px-3 py-1 font-semibold bg-white border-cyanblue"
                >
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
                <div className="d-flex gap-2 align-items-center">
                    <div className="bg-cyanblue px-3 py-1 font-semibold text-white rounded primary-btn">
                        EXPORT DATA
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="dashboard-table mx-3 p-2 pb-0 border-cyanblue bg-white">
                <div className="d-flex justify-content-between py-2 px-2">
                    <h5 className="font-semibold">Informasi Total Data UPT</h5>
                </div>
                <div className="">
                    <div className="row row-header">
                        <div className="col d-flex align-items-center justify-content-center">
                            NAMA UPT
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            Jumlah Bidang Tanah
                        </div>
                        <div className="col d-flex flex-col align-items-center justify-content-center">
                            TOTAL PINJAM PAKAI
                            <br />
                        </div>
                        <div className="col d-flex flex-col align-items-center justify-content-center">
                            TOTAL PAKAI SENDIRI
                            <br />
                        </div>
                        <div className="col d-flex flex-col align-items-center justify-content-center">
                            TOTAL SEWA/SIP BMD
                            <br />
                            <div className="row py-2">
                                <div className="col">TANAH(M)</div>
                                <div className="col">RUPIAH</div>
                            </div>
                        </div>
                        <div className="col d-flex flex-col align-items-center justify-content-center py-2">
                            TOTAL RETRIBUSI
                            <br />
                            <div className="row py-2">
                                <div className="col">TANAH(M)</div>
                                <div className="col">RUPIAH</div>
                            </div>
                        </div>
                    </div>
                    {emptyMsg == "" ? (
                        <>
                            {dashboardData.map((item) => {
                                return <DashboardTableRow title={item.name} dashboardItem={item} />;
                            })}
                        </>
                    ) : (
                        <>
                            <div class="text-center">{emptyMsg}</div>
                        </>
                    )}
                </div>
                <div
                    className="row row-content col-footer border-none"
                    style={{
                        background: "#EDF9FB",
                    }}
                >
                    <div className="col d-flex align-items-center justify-content-center">
                        TOTAL KESELURUHAN
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        500
                    </div>
                    <div className="col d-flex flex-col align-items-center justify-content-center">
                        <div className="row py-2">
                            <div className="col">500</div>
                        </div>
                    </div>
                    <div className="col d-flex flex-col align-items-center justify-content-center">
                        <div className="row py-2">
                            <div className="col">500</div>
                        </div>
                    </div>
                    <div className="col d-flex flex-col align-items-center justify-content-center">
                        <div className="row py-2">
                            <div className="col">500</div>
                            <div className="col">5.000.000</div>
                        </div>
                    </div>
                    <div className="col d-flex flex-col align-items-center justify-content-center">
                        <div className="row py-2">
                            <div className="col">500</div>
                            <div className="col">5.000.000</div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
};
