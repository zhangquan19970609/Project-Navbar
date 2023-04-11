import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  // 设置一个简单的 toggle，点击 nav toggle 键能调整 links 的显示与否

  const [showLinks, setShowLinks] = useState(false);

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // 这个变量命名为 linksHeight，体现了 links 有多长，以此来设置 links container 的 Height
    const linksBoundary = linksRef.current.getBoundingClientRect();
    const linksHeight = linksBoundary.height;
    // console.log(linksHeight); // log 出了 ul.links 的 长宽高信息
    console.log(linksContainerRef.current.getBoundingClientRect()); // 验证 links-container 的 default height 为 0
    if (showLinks) { 
      // 当 showLinks 时，links-container 的 height 设置为 links 的 height.
      linksContainerRef.current.style.height = `${linksHeight}px`
      // 要注意的是，index.css 会将 links-container 的 height 设置为 auto !important，这是有原因的。
      // 假设不设置为 !impotant,
        // 则使用 useRef 进行 inline CSS 修饰，会覆盖掉 index.css 的 external CSS，
        // 而如果在小屏幕上，links-container 收起，此刻 height 设置为 0，
        // 则换到大屏幕，links 不会显示了，因为 links-container 被设置为 0。
      // links-container 的 height 应该始终取到一定的值！
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  },[showLinks])

  return <nav>
    <div className='nav-center'>
      <div className='nav-header'>
        <img src={logo} className='logo' alt='logo'></img>
        <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}> {/* 当 click 时，setShowLinks */}
          <FaBars />
        </button>
      </div>
      {/* {showLinks && <div className='links-container show-container'>       */}
        {/* 或者采用另一种方法：className={`${showLinks ? 'links-container show-container': 'show-container'}`} */}
        {/* 这种方法需要手动设置 links-container height 才能起效，
          当 links 超过 links-container 的 height 时，就需要手动设置。
          最方便的是 使用 useRef。 */}

      {/* useRef 方法：只需要最简单的 links-container 和 links */}

      {/* 为什么必须使用一个 class links-container? 
      因为 小屏幕状态下，links-Container 的 height 默认为 0，（CSS 文件中有 default height: 0）
      ul.links 必须有一个 parent div 才能正常显示，且这个 parent.div 的 height 不能为 0！
      功能逻辑是：先得出 ul.links 的 height，然后将 links-container 的 height 重设为 links 的 height. */}
      <div className='links-container' ref={linksContainerRef}>
        <ul className='links' ref={linksRef}>
          {links.map((item) => {
            return <li key={item.id}>
              <a href={item.url}>{item.text}</a>
            </li>
          })}
        </ul>
      </div>

      <ul className='social-icons'>
        {social.map((item) => {
          return <li key={item.id}>
            <a href={item.url}>
              {item.icon}
            </a>
        </li>
        })}
      </ul>
    </div>
  </nav>
}

export default Navbar
