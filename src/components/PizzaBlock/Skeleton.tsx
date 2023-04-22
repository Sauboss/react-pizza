import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton:React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="5" y="290" rx="12" ry="12" width="275" height="23" />
    <rect x="3" y="328" rx="10" ry="10" width="275" height="85" />
    <rect x="7" y="430" rx="8" ry="8" width="95" height="30" />
    <rect x="124" y="422" rx="20" ry="20" width="153" height="40" />
  </ContentLoader>
)

export default Skeleton