import { ActionIcon, Logo, SideNav, Tooltip } from "@lobehub/ui";
import { Album, Settings2, Box, User, BotMessageSquare } from 'lucide-react';
import { memo, useEffect, useState } from "react";
import { Flexbox } from 'react-layout-kit';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Dropdown, message } from "antd";
import ChangePassword from "../../components/ChangePassword";


const DesktopLayout = memo(() => {
  const [tab, setTab] = useState<string>('chat');
  const [ChangePasswordVisible, setChangePasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const tabs = [{
    icon: BotMessageSquare,
    key: 'chat',
    description: '聊天',
    path: '/chat'
  }, {
    icon: Box,
    key: 'application',
    description: '应用',
    path: '/app'
  }, {
    icon: Album,
    key: 'wiki',
    description: '知识库',
    path: '/wiki'
  }, {
    icon: User,
    key: 'user',
    description: '用户管理',
    path: '/user'
  }]

  const items = [
    {
      key: '1',
      onClick: () => setChangePasswordVisible(true),
      label: (
        <span>修改密码</span>
      ),
    },
    {
      key: '2',
      label: (
        <span>系统设置</span>
      ),
    },
    {
      key: '3',
      onClick: () => {
        message.success('退出成功');
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login');
        }, 1000);
      },
      label: (
        <span>退出登录</span>
      ),
    },
  ]

  useEffect(() => {
    // 获取当前路由匹配前缀一致的tab
    const currentTab = tabs.find(item => window.location.pathname.startsWith(item.path));
    if (currentTab) {
      setTab(currentTab.key);
    }

  })

  function updateTab(item: { key: string, path: string, description: string, icon: any }) {
    setTab(item.key);
    navigate(item.path);
  }

  return (<Flexbox
    height={'100%'}
    horizontal
    width={'100%'}
  >
    <SideNav
      avatar={<Logo size={40} />}
      bottomActions={
        <Dropdown menu={{ items }} placement="topRight">
          <ActionIcon icon={Settings2} />
        </Dropdown>}
      topActions={
        <>
          {tabs.map((item, index) => {
            return (
              <Tooltip key={index} arrow={true} placement='right' title={item.description}>
                <ActionIcon
                  active={tab === item.key}
                  icon={item.icon}
                  key={item.key}
                  onClick={() => updateTab(item)}
                  size="large"
                />
              </Tooltip>)
          })}
        </>
      }
    >
    </SideNav>
    <Outlet />
    <ChangePassword visible={ChangePasswordVisible} onClose={() => setChangePasswordVisible(false)} onSuccess={() => {
      setChangePasswordVisible(false);
    }} />
  </Flexbox>)
});

export default DesktopLayout;