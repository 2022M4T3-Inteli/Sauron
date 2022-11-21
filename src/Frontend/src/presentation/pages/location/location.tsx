import React, { useEffect, useState } from 'react'
import { Select, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { Input, Button, Popover } from 'antd'
import { Header, Navbar } from '../../components'
import './location.scss'
  ;
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


type TagType = {
  id: number;
  macAdress: string;
  name: string;
  category: string;
  battery: any;
  isMoving: boolean;
  position: [number, number]
}

type CategoryType = {
  id: number;
  name: string;
}

const sendStatus: Function = async (status: boolean) => {
  await fetch("http://10.128.64.69:8000/api/tags/tagStatus", {
    method: "POST",
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ activated: status }),
    // credentials: 'same-origin',
    // referrerPolicy: 'unsafe-url'
  })
}

const getStatus: Function = async () => {
  await fetch("http://10.128.64.69:8000/api/tags/tagStatus", {
    method: "GET",
    // mode: 'cors',
    // headers: {
    //   'Content-Type': 'application/json'
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // }
    // credentials: 'same-origin',
    // referrerPolicy: 'unsafe-url'
  }).then((response) => response.json())
    .then((json) => {
      console.log(json.isMoving)
      return json
    })
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  };
  return (
    <Tag
      color={"lime"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

const batteryLevel: Function = (level: number) => {
  let type = 0
  let difference = Math.abs(20 - level)

  if (Math.abs(50 - level) < difference) {
    difference = Math.abs(50 - level)
    type = 1
  }
  if (Math.abs(80 - level) < difference) {
    difference = Math.abs(80 - level)
    type = 2
  }
  if (Math.abs(100 - level) < difference) {
    difference = Math.abs(100 - level)
    type = 3
  }

  switch (type) {
    case 0:
      return <BatteryCharging20Icon className='icon low' />
    case 1:
      return <BatteryCharging50Icon className='icon' />
    case 2:
      return <BatteryCharging80Icon className='icon' />
    case 3:
      return <BatteryChargingFullIcon className='icon' />
  }
}


const Location: any = (Parent: any) => {
  const [active, setActive] = useState(-1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([''])
  const [tags, setTags] = useState(
    [
      {
        id: 0,
        macAdress: 'abc',
        name: "Objeto 1",
        battery: batteryLevel(28),
        category: "Furadeiras",
        isMoving: true,
        position: [100, 250]
      },
      {
        id: 1,
        macAdress: 'abc',
        name: "Objeto 2",
        battery: batteryLevel(50),
        category: "Motoserras",
        isMoving: false,
        position: [100, 350]
      },
      {
        id: 2,
        macAdress: 'abc',
        name: "Objeto 3",
        battery: batteryLevel(72),
        category: "Britadeiras",
        isMoving: false,
        position: [50, 450]
      },
      {
        id: 3,
        macAdress: 'abc',
        name: "Objeto 4",
        battery: batteryLevel(89),
        category: "Motoserras",
        isMoving: false,
        position: [175, 600]
      },
      {
        id: 4,
        macAdress: 'abc',
        name: "Objeto 5",
        battery: batteryLevel(10),
        category: "Britadeiras",
        isMoving: false,
        position: [200, 250]
      },
      {
        id: 5,
        macAdress: 'abc',
        name: "Objeto 6",
        battery: batteryLevel(0),
        category: "Furadeiras",
        isMoving: false,
        position: [120, 520]
      },
      {
        id: 6,
        macAdress: 'abc',
        name: "Objeto 7",
        battery: batteryLevel(100),
        category: "Motoserras",
        isMoving: false,
        position: [300, 450]
      },
      {
        id: 7,
        macAdress: 'abc',
        name: "Objeto 8",
        battery: batteryLevel(45),
        category: "Britadeiras",
        isMoving: false,
        position: [300, 150]
      }
    ]
  )

  const tagExamples: TagType[] = [
    {
      id: 0,
      macAdress: 'abc',
      name: "Objeto 1",
      battery: batteryLevel(28),
      category: "Furadeiras",
      isMoving: true,
      position: [100, 250]
    },
    {
      id: 1,
      macAdress: 'abc',
      name: "Objeto 2",
      battery: batteryLevel(50),
      category: "Motoserras",
      isMoving: false,
      position: [100, 350]
    },
    {
      id: 3,
      macAdress: 'abc',
      name: "Objeto 4",
      battery: batteryLevel(89),
      category: "Motoserras",
      isMoving: false,
      position: [175, 600]
    },
    {
      id: 4,
      macAdress: 'abc',
      name: "Objeto 5",
      battery: batteryLevel(10),
      category: "Britadeiras",
      isMoving: false,
      position: [200, 250]
    },
    {
      id: 5,
      macAdress: 'abc',
      name: "Objeto 6",
      battery: batteryLevel(0),
      category: "Furadeiras",
      isMoving: false,
      position: [120, 520]
    },
    {
      id: 6,
      macAdress: 'abc',
      name: "Objeto 7",
      battery: batteryLevel(100),
      category: "Motoserras",
      isMoving: false,
      position: [300, 450]
    },
    {
      id: 7,
      macAdress: 'abc',
      name: "Objeto 8",
      battery: batteryLevel(45),
      category: "Britadeiras",
      isMoving: false,
      position: [300, 150]
    }
  ]

  // useEffect(() => {
  //   setInterval(() => {
  //     setTags([...tagExamples, {
  //       id: 2,
  //       macAdress: 'abc',
  //       name: "Objeto 2",
  //       battery: batteryLevel(72),
  //       category: "Britadeiras",
  //       isMoving: getStatus().isMoving,
  //       position: [50, 450]
  //     }])
  //   }, 30000)
  // }, [tags])

  useEffect(() => {
    setActive(Parent.props.actualTag)
  }, [Parent.props.actualTag])

  const categories: CategoryType[] = [
    {
      id: 0,
      name: "Furadeiras"
    },
    {
      id: 1,
      name: "Britadeiras"
    },
    {
      id: 2,
      name: "Motoserras"
    }
  ]

  const handleActive: Function = (index: number) => {
    if (index !== active) {
      setTimeout(() => Parent.props.changeTag(index), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }

    else {
      setTimeout(() => Parent.props.changeTag(-1), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }
  }

  const handleSearch: Function = (value: string) => {
    setSearch(value)
    if (active != -1) {
      handleActive(-1)
    }
  }

  const handleFilter: Function = (value: string[]) => {
    if (active != -1) {
      handleActive(-1)
    }
    setFilter(value)
  }

  const showTag: Function = (tag: any, index: number) => {
    if (tag.name.toLowerCase().includes(search.toLowerCase())) {
      if (filter.includes(tag.category) || !filter[0]) {
        if (active !== -1) {
          if (index === active) {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-${tag.name}`}
                onClick={() => handleActive(index)}
                className={`tag ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: `${tag.position[0]}px`,
                    left: `${tag.position[1]}px`
                  }}>
              </div>
              // </Popover>
            )
          }
          else {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-location-${tag.name}`}
                onClick={() => handleActive(index)}
                className={`tag outFocus ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: `${tag.position[0]}px`,
                    left: `${tag.position[1]}px`
                  }}>
              </div>
              // </Popover>
            )
          }
        }
        else {
          return (
            // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
            <div
              key={`tag-location-${tag.name}`}
              onClick={() => handleActive(index)}
              className={`tag ${tag.isMoving ? 'active' : ''}`}
              style={
                {
                  top: `${tag.position[0]}px`,
                  left: `${tag.position[1]}px`
                }}>
            </div>
            // </Popover>
          )
        }
      }
    }
  }


  const [buttonActivated, setButtonActivated] = useState(false)

  const handleActivated: Function = () => {
    sendStatus(!buttonActivated)
    setButtonActivated(!buttonActivated)
  }



  const showInfo: Function = () => {
    if (active != -1) {
      return (
        <div
          className="info"
          style={
            {
              top: `${tags[active].position[0]}px`,
              left: `${tags[active].position[1] + 60}px`
            }
          }>
          <div className="name">
            {tags[active].name}
          </div>
          <div onClick={() => handleActivated()} className='buttonContainer'>
            <div className={buttonActivated ? 'buttonActivated' : 'buttonDesactived'}>Acionar Tag</div>
          </div>
        </div>
      )
    }
  }

  const showTags: Function = () => {
    let content: any = []

    if (active !== -1 && tags[active].name.toLowerCase().includes(search.toLowerCase())) {
      if (filter.includes(tags[active].category) || !filter[0]) {
        content.push(
          <div
            key={`tag-${tags[active].name}`}
            onClick={() => handleActive(active)}
            className={`item active`}
          >
            {
              tags[active].isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
            }
            <div className="name">
              {tags[active].name}
            </div>
            {
              tags[active].battery
            }
          </div>
        )
      }
    }

    tags.map((tag: any, index) => {
      if (index != active && tag.name.toLowerCase().includes(search.toLowerCase())) {
        if (filter.includes(tag.category) || !filter[0]) {
          content.push(
            <div
              key={`tag-${tag.name}`}
              onClick={() => handleActive(index)}
              className={index === active ? 'item active' : 'item'}
            >
              {
                tag.isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
              }
              <div className="name">
                {tag.name}
              </div>
              {
                tag.battery
              }
            </div>
          )
        }
      }
    })

    if (content.length === 0) {
      content.push(
        <p key={`text-0`} className='text'>Nenhuma tag encontrada</p>
      )
    }

    return content
  }

  const { Search } = Input

  const options = [
    ...categories.map((category) => (
      {
        label: category.name,
        value: category.name
      }
    ))
  ]

  return (
    <div id="location">
      {/* <div className="container"> */}
      <div className="filter">
        <Search className='search' allowClear placeholder="Buscar por Tag" onChange={(e) => handleSearch(e.target.value)} value={search} />
        <Select
          className='select'
          mode="multiple"
          onChange={(value) => handleFilter(value)}
          notFoundContent="Categoria não encontrada"
          placeholder="Categorias"
          autoClearSearchValue
          allowClear
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}
        />
      </div>
      <div className="row">
        <div className="col leftSide">
          {
            tags.map((tag, index) => {
              return showTag(tag, index)
            })
          }
          {
            showInfo()
          }
        </div>
        <div className="col rightSide">
          {
            showTags()
          }
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Location
