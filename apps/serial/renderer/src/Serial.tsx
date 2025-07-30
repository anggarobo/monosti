import { useEffect, useState } from "react";

export default function SerialPort() {
  const [receivedData, setReceivedData] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [status, setStatus] = useState<string>("Connecting...");
  const [ports, setPorts] = useState<any>(undefined);

  const getPortList = async () => {
    const port = await window.api.serial.listPorts();

    if (port) setStatus("Connected");
    setPorts(port);
  };

  useEffect(() => {
    getPortList();

    window.api.serial.onPortListChanged((info) => {
      console.log({info});
    });

    // Listen data masuk
    window.api.serial.onData(({ path, data }) => {
      console.log(`[${path}] received`, data);
      setReceivedData((prev) => prev + data + "\n");
    });

    // Listen data masuk
    window.api.serial.onStatus((stat) => {
      console.log({ status: stat });
      setStatus(stat);
    });

    // Kirim data tiap 5 detik
    // const intervalId = setInterval(() => {
    //   window.api.serial.sendData("Ping from Renderer!\n");
    // }, 5000);

    // Cleanup saat komponen di-unmount
    return () => {
      // clearInterval(intervalId);
      // window.api.serial.disconnect();
      // setStatus("Terputus dari TCP.");
    };
  }, []);

  const onSend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (command.trim() !== "") {
      window.api.serial.sendData({
        data: command.trim(),
        path: path,
      });
      setCommand("");
    }
  };

  console.log({ ports });

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>SerialPort Test</h1>
      {ports ? (
        <div>
          <p>Ports:</p>
          <ul>
            {ports?.output?.map((item: { path: string; source: string }) => (
              <li key={item?.path}>{item?.path} connected!</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{status}</p>
      )}

      <h3>Received Data:</h3>
      <div
        style={{
          minHeight: 50,
          padding: 10,
          border: "1px solid #ccc",
          marginBottom: 20,
          backgroundColor: "#f9f9f9",
          whiteSpace: "pre-wrap",
        }}
      >
        {receivedData || "Empty!"}
      </div>

      <h3>Send a Command:</h3>
      <form onSubmit={onSend} style={{ width: "70%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
          <div style={{ display: "flex", gap: 8 }} >
            <input
              placeholder="Input Command"
              onChange={(e) => setCommand(e.target.value)}
              style={{ flex: 1 }}
            />
            <select
              onChange={(e) => setPath(e.target.value)}
            >
                <option value="/tmp/ttyV1">
                    /tmp/ttyV1
                </option>
                <option value="/tmp/ttyV3">
                    /tmp/ttyV3
                </option>
            </select>
          </div>
          <button disabled={path == ""} style={{ width: "100px" }} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
