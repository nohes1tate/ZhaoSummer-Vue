export const defalutMenus = {
   back: {
     icon: 't-icon t-angle-left'
   },
  // login: true,
  left: [
    {
      name: '文件',
      icon: 't-icon t-folder',
      children: [
        { name: '导入文件', keyboard: 'Ctrl+I', action: 'load' },
        {},
        { name: '保存', keyboard: 'Ctrl+S', action: 'save' },
        { name: '下载JSON文件', action: 'downloadJson' },
        { name: '导出HTML文件', action: 'downloadHtml'},
        {},
        { name: '下载为PNG', action: 'downloadPng' },
        { name: '下载为SVG', action: 'downloadSvg' }
      ]
    },
    {
      name: '编辑',
      icon: 't-icon t-edit',
      children: [
        { name: '撤销', keyboard: 'Ctrl+Z', action: 'undo' },
        { name: '恢复  ', keyboard: 'Ctrl+Shift+Z', action: 'redo' },
        {},
        { name: '剪切  ', keyboard: 'Ctrl+X', action: 'cut' },
        { name: '复制  ', keyboard: 'Ctrl+C', action: 'copy' },
        { name: '粘贴  ', keyboard: 'Ctrl+V', action: 'paste' }
      ]
    },
    {
      name: '保存',
      icon: 't-icon t-save',
      action: 'save'
    },
    {
      name: '撤销',
      icon: 't-icon t-reply',
      action: 'undo'
    }
  ]
  // middle: []
};

export const defalutUserMenus = null;

export const defalutMaterials = [
  {
    name: '流程图',
    expand: true,
    show: true,
    list: [
      {
        name: '开始/结束',
        icon: 't-icon t-flow-start',
        id: 21,
        data: {
          text: '开始/结束',
          rect: {
            width: 120,
            height: 40
          },
          borderRadius: 0.5,
          name: 'rectangle'
        }
      },
      {
        name: '流程',
        icon: 't-icon t-rectangle',
        id: 22,
        data: {
          text: '流程',
          rect: {
            width: 120,
            height: 40
          },
          name: 'rectangle'
        }
      },
      {
        name: '判定',
        icon: 't-icon t-diamond',
        id: 23,
        data: {
          text: '判定',
          rect: {
            width: 120,
            height: 60
          },
          name: 'diamond'
        }
      },
      {
        name: '数据',
        icon: 't-icon t-flow-data',
        id: 24,
        data: {
          text: '数据',
          rect: {
            width: 120,
            height: 50
          },
          name: 'flowData'
        }
      },
      {
        name: '准备',
        icon: 't-icon t-flow-ready',
        id: 25,
        data: {
          text: '准备',
          rect: {
            width: 120,
            height: 50
          },
          name: 'hexagon'
        }
      },
      {
        name: '子流程',
        icon: 't-icon t-flow-subprocess',
        id: 26,
        data: {
          text: '子流程',
          rect: {
            width: 120,
            height: 50
          },
          name: 'flowSubprocess'
        }
      },
      {
        name: '数据库',
        icon: 't-icon t-db',
        id: 27,
        data: {
          text: '数据库',
          rect: {
            width: 80,
            height: 120
          },
          name: 'flowDb'
        }
      },
      {
        name: '文档',
        icon: 't-icon t-flow-document',
        id: 28,
        data: {
          text: '文档',
          rect: {
            width: 120,
            height: 100
          },
          name: 'flowDocument'
        }
      },
      {
        name: '内部存储',
        icon: 't-icon t-internal-storage',
        id: 29,
        data: {
          text: '内部存储',
          rect: {
            width: 120,
            height: 80
          },
          name: 'flowInternalStorage'
        }
      },
      {
        name: '外部存储',
        icon: 't-icon t-extern-storage',
        id: 30,
        data: {
          text: '外部存储',
          rect: {
            width: 120,
            height: 80
          },
          name: 'flowExternStorage'
        }
      },
      {
        name: '队列',
        icon: 't-icon t-flow-queue',
        id: 31,
        data: {
          text: '队列',
          rect: {
            width: 100,
            height: 100
          },
          name: 'flowQueue'
        }
      },
      {
        name: '手动输入',
        icon: 't-icon t-flow-manually',
        id: 32,
        data: {
          text: '手动输入',
          rect: {
            width: 120,
            height: 80
          },
          name: 'flowManually'
        }
      },
      {
        name: '展示',
        icon: 't-icon t-flow-display',
        id: 33,
        data: {
          text: '展示',
          rect: {
            width: 120,
            height: 80
          },
          name: 'flowDisplay'
        }
      },
      {
        name: '并行模式',
        icon: 't-icon t-flow-parallel',
        id: 34,
        data: {
          text: '并行模式',
          rect: {
            width: 120,
            height: 50
          },
          name: 'flowParallel'
        }
      },
      {
        name: '注释',
        icon: 't-icon t-flow-comment',
        id: 35,
        data: {
          text: '注释',
          rect: {
            width: 100,
            height: 100
          },
          name: 'flowComment'
        }
      }
    ]
  },
  {
    name: '活动图',
    expand: true,
    show: true,
    list: [
      {
        name: '开始',
        icon: 't-icon t-inital',
        id: 36,
        data: {
          text: '',
          rect: {
            width: 30,
            height: 30
          },
          name: 'circle',
          fillStyle: '#555',
          strokeStyle: 'transparent'
        }
      },
      {
        name: '结束',
        icon: 't-icon t-final',
        id: 37,
        data: {
          text: '结束',
          rect: {
            width: 30,
            height: 30
          },
          name: 'activityFinal'
        }
      },
      {
        name: '活动',
        icon: 't-icon t-action',
        id: 38,
        data: {
          text: '活动',
          rect: {
            width: 120,
            height: 50
          },
          borderRadius: 0.25,
          name: 'rectangle'
        }
      },
      {
        name: '决策/合并',
        icon: 't-icon t-diamond',
        id: 39,
        data: {
          text: '决策/合并',
          rect: {
            width: 120,
            height: 50
          },
          name: 'diamond'
        }
      },
      {
        name: '垂直泳道',
        icon: 't-icon t-swimlane-v',
        id: 40,
        data: {
          text: '垂直泳道',
          rect: {
            width: 200,
            height: 500
          },
          name: 'swimlaneV'
        }
      },
      {
        name: '水平泳道',
        icon: 't-icon t-swimlane-h',
        id: 41,
        data: {
          text: '水平泳道',
          rect: {
            width: 500,
            height: 200
          },
          name: 'swimlaneH'
        }
      },
      {
        name: '垂直分岔/汇合',
        icon: 't-icon t-fork-v',
        id: 42,
        data: {
          text: '垂直分岔/汇合',
          rect: {
            width: 10,
            height: 150
          },
          name: 'forkV',
          fillStyle: '#555',
          strokeStyle: 'transparent'
        }
      },
      {
        name: '水平分岔/汇合',
        icon: 't-icon t-fork',
        id: 43,
        data: {
          text: '水平分岔/汇合',
          rect: {
            width: 150,
            height: 10
          },
          name: 'forkH',
          fillStyle: '#555',
          strokeStyle: 'transparent'
        }
      }
    ]
  },
  {
    name: '时序图和类图',
    expand: true,
    show: true,
    list: [
      {
        name: '生命线',
        icon: 't-icon t-lifeline',
        id: 44,
        data: {
          text: '生命线',
          rect: {
            width: 150,
            height: 400
          },
          name: 'lifeline'
        }
      },
      {
        name: '激活',
        icon: 't-icon t-focus',
        id: 45,
        data: {
          text: '激活',
          rect: {
            width: 12,
            height: 200
          },
          name: 'sequenceFocus'
        }
      },
      {
        name: '简单类',
        icon: 't-icon t-simple-class',
        id: 46,
        data: {
          text: 'Topolgoy',
          rect: {
            width: 270,
            height: 200
          },
          paddingTop: 40,
          font: {
            fontFamily: 'Arial',
            color: '#222222',
            fontWeight: 'bold'
          },
          fillStyle: '#ffffba',
          strokeStyle: '#7e1212',
          name: 'simpleClass',
          list: [
            {
              text: '- name: string\n+ setName(name: string): void',
              name: 'text',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                rotate: 0
              },
              font: {
                fontFamily: 'Arial',
                color: '#222222',
                textAlign: 'left',
                textBaseline: 'top'
              }
            }
          ]
        }
      },
      {
        name: '类',
        icon: 't-icon t-class',
        id: 47,
        data: {
          text: 'Topolgoy',
          rect: {
            width: 270,
            height: 200
          },
          paddingTop: 40,
          font: {
            fontFamily: 'Arial',
            color: '#222222',
            fontWeight: 'bold'
          },
          fillStyle: '#ffffba',
          strokeStyle: '#7e1212',
          name: 'interfaceClass',
          list: [
            {
              text: '- name: string',
              name: 'text',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '50%',
                rotate: 0
              },
              font: {
                fontFamily: 'Arial',
                color: '#222222',
                textAlign: 'left',
                textBaseline: 'top'
              }
            },
            {
              text: '+ setName(name: string): void',
              name: 'text',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: '50%',
                width: '100%',
                height: '50%',
                rotate: 0
              },
              font: {
                fontFamily: 'Arial',
                color: '#222222',
                textAlign: 'left',
                textBaseline: 'top'
              }
            }
          ]
        }
      }
    ]
  }
];

export const images = [
  {
    image:
      ''
  }
];
