import React from 'react';

export default function App() {
  const [platform, setPlatform] = React.useState("");

  React.useEffect(() => {
    console.log(window.api)
    window.api?.platform().then((res) => {
      console.log(res)
      setPlatform(res.platform)
    });
  }, []);

  return (
    <div>
      <h1>Hi!</h1>
      <p>Platform: {platform}</p>
    </div>
  );
}
