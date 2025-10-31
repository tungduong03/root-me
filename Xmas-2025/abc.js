// Import và xuất các thành phần
((e.exports = n(
    K(),
    X0(),
    vd(),
    hd(),
    er(),
    md(),
    tr(),
    mf(),
    qi(),
    yd(),
    yf(),
    gd(),
    Ed(),
    Cd(),
    Gi(),
    Bd(),
    jt(),
    pe(),
    wd(),
    Fd(),
    Ad(),
    Dd(),
    _d(),
    kd(),
    Sd(),
    zd(),
    Pd(),
    Nd(),
    Rd(),
    Ld(),
    Td(),
    Hd(),
    Od(),
    jd(),
    Id()
))($, function (r) {
    return r;
}))(hf);

var Md = hf.exports;
const gf = Rf(Md);
const Ud = "S4NT4_S3CR3T_K3Y_T0_ENCRYPT_DATA";

// Hàm mã hóa dữ liệu
function Wd(e) {
    const t = JSON.stringify(e);
    return gf.AES.encrypt(t, Ud).toString();
}

// Hàm tạo checksum và salt
function $d(e, t) {
    const r = Math.floor(Math.random() * 9) + 1;
    const n = `${e}-${t}-${r}`;
    return {
        checksum: gf.SHA256(n).toString(),
        salt: r
    };
}

// Gửi điểm đến API
async function Vd(e, t) {
    const { checksum: r, salt: n } = $d(e, t);
    const l = Wd({ playerName: e, score: t, checksum: r, salt: n });

    try {
        return await (
            await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: l })
            })
        ).json();
    } catch (i) {
        console.error("Error submitting score:", i);
        return { success: false };
    }
}

// Lấy danh sách điểm cao
async function Qd() {
    try {
        return await (await fetch("/api/scores")).json();
    } catch (e) {
        console.error("Error fetching scores:", e);
        return [];
    }
}

// Các hằng số
const il = 120,
    Za = 160,
    It = 50,
    Kd = 20,
    Ja = 300;

// Giao diện hiển thị khi game kết thúc
const qd = ({ score: e, flag: t }) =>
    U.jsxs("div", {
        className: "absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-50 text-white",
        children: [
            U.jsx("h1", { className: "text-4xl font-bold", children: "Game Over" }),
            U.jsxs("p", { className: "text-2xl mt-4", children: ["Your Score: ", e] }),
            t &&
                U.jsxs("div", {
                    className: "mt-6 bg-green-500 p-4 rounded-lg",
                    children: [
                        U.jsx("p", { className: "text-xl font-bold", children: "🎉 New Record!" }),
                        U.jsxs("p", { children: ["Your Flag: ", t] })
                    ]
                })
        ]
    });

// Thành phần chính của game
function Gd({ playerName: e, onGameOver: t }) {
    const [r, n] = Y.useState(0),
        [o, l] = Y.useState(window.innerWidth / 2),
        [i, a] = Y.useState([]),
        [c, u] = Y.useState(Kd),
        [d, y] = Y.useState(null),
        [x, m] = Y.useState(false),
        h = Y.useRef(),
        g = Y.useRef(null),
        E = Y.useRef({ ArrowLeft: false, ArrowRight: false }),
        p = Y.useRef(false),
        s = Y.useRef(0);

    // Các hook quản lý trạng thái
    // ...

    // Trả về giao diện game
    return U.jsxs("div", {
        className: "relative w-full h-screen bg-gradient-to-b from-blue-900 to-blue-600 overflow-hidden",
        children: [
            U.jsxs("div", {
                className: "absolute top-4 left-4 bg-white/80 rounded-lg p-2 z-10",
                children: [
                    U.jsxs("p", { className: "text-xl font-bold", children: ["Score: ", r] }),
                    U.jsxs("p", { className: "text-lg", children: ["Time: ", Math.ceil(c), "s"] })
                ]
            }),
            x && U.jsx(qd, { score: r, flag: d }),
            U.jsx("div", {
                className: "absolute bottom-0",
                style: { left: o, width: il, height: Za },
                children: U.jsx("img", {
                    src: "/images/hotte.png",
                    alt: "Santa",
                    className: "w-full h-full object-contain"
                })
            }),
            i.map((v, C) =>
                U.jsx(
                    "div",
                    {
                        className: "absolute",
                        style: { left: v.x, top: v.y, width: It, height: It },
                        children: U.jsx(vf, { className: "w-full h-full text-red-500" })
                    },
                    C
                )
            )
        ]
    });
}

// Thành phần hiển thị điểm cao
function Xd({ onPlayAgain: e }) {
    const [t, r] = Y.useState([]);

    Y.useEffect(() => {
        (async () => {
            const o = await Qd();
            r(o);
        })();
    }, []);

    return U.jsx("div", {
        className: "min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-8",
        children: U.jsxs("div", {
            className: "bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col h-full max-h-[90vh]",
            children: [
                // Header và danh sách điểm cao
                // ...
                U.jsx("button", {
                    onClick: e,
                    className: "mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors",
                    children: "Play Again"
                })
            ]
        })
    });
}

// Component chính của ứng dụng
function Yd() {
    const [e, t] = Y.useState("start"),
        [r, n] = Y.useState(""),
        [o, l] = Y.useState(() => {
            const u = localStorage.getItem(ba);
            return u ? JSON.parse(u) : [];
        });

    Y.useEffect(() => {
        localStorage.setItem(ba, JSON.stringify(o));
    }, [o]);

    const i = (u) => {
            n(u);
            t("playing");
        },
        a = (u) => {
            l((d) => [...d, { name: r, score: u }]);
            t("end");
        },
        c = () => {
            t("start");
        };

    return U.jsxs("div", {
        className: "w-full h-screen",
        children: [
            e === "start" && U.jsx(cd, { onStart: i }),
            e === "playing" && U.jsx(Gd, { playerName: r, onGameOver: a }),
            e === "end" && U.jsx(Xd, { onPlayAgain: c })
        ]
    });
}

// Khởi tạo ứng dụng
df(document.getElementById("root")).render(
    U.jsx(Y.StrictMode, {
        children: U.jsx(Yd, {})
    })
);
