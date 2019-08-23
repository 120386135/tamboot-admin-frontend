import { BusinessCode } from '@/utils/constants';
import { mockDelay } from '@/utils/utils';

const proxy = {
  'GET /api/common/menu/tree': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
      data: [
        {
          id: '6533916193823133696',path: '/system',locale: null,name: '系统配置',icon: 'setting',orderIndex: 0,parent: null,
          children: [
            {id: '6536612123282247681', path: '/system/user', locale: null, name: '用户管理', icon: null, orderIndex: 1, parent: '6533916193823133696', children: []},
            {id: '6533916677858398211',path: '/system/menu',locale: null,name: '菜单管理',icon: null,orderIndex: 2,parent: '6533916193823133696',children: []},
            {id: '6533916797031157764',path: '/system/role',locale: null,name: '角色管理',icon: null,orderIndex: 3,parent: '6533916193823133696',children: []},
            {id: '6536608913624666112',path: '/system/permission',locale: null,name: '访问权限',icon: null,orderIndex: 4,parent: '6533916193823133696',children: []},
          ],
        },
        {
          id: '6533917218659373061',path: '/user',locale: null,name: '用户中心',icon: 'hdd',orderIndex: 2,parent: null,
          children: [
            {id: '6533917345537069062',path: '/user/password',locale: null,name: '修改密码',icon: null,orderIndex: 0,parent: '6533917218659373061',children: []},
          ],
        },
        {
          id:"6541132351248797696",path:"/frontdocs",name:"前端文档",icon:"read",orderIndex:3,
          children:[
            {id:"6541279034167267328", path:"/frontdocs/quickstartdoc", name:"快速上手", orderIndex:1, parent:"6541132351248797696", children:[]},
            {id:"6541132579280523265", path:"/frontdocs/pageviewdoc", name:"分页组件", orderIndex:2, parent:"6541132351248797696", children:[]},
            {id:"6541585418129772545", path:"/frontdocs/createmodaldoc", name:"新建模态框", orderIndex:3, parent:"6541132351248797696", children:[]},
            {id:"6541595299213742082", path:"/frontdocs/updatemodaldoc", name:"修改模态框", orderIndex:4, parent:"6541132351248797696", children:[]},
            {id:"285984722792738816", path:"/frontdocs/confirmdialogdoc", name:"确认模态框", orderIndex:5, parent:"6541132351248797696", children:[]},
            {id:"285985067933626368", path:"/frontdocs/formviewdoc", name:"通用表单页", orderIndex:6, parent:"6541132351248797696", children:[]},
            {id:"6541630552024289280", path:"https://github.com/chensheng/tamboot-admin-front", name:"Github源码", orderIndex:7, parent:"6541132351248797696", children:[]},
            {id:"6541562553728765952", path:"https://ant.design/docs/react/introduce-cn", name:"Ant Design", orderIndex:8, parent:"6541132351248797696", children:[]}
          ]
        },
      ],
    });
  },
};

export default mockDelay(proxy);
