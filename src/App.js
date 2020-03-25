import React from 'react'
import './App.css'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Avatar,
  ListItemIcon
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  ShowChart,
  WbSunny,
  BrightnessHigh,
  Waves,
  Brightness5,
  Whatshot
} from '@material-ui/icons'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {
        weather: '',
        temperature: '',
        temperature_max: '',
        temperature_min: '',
        icon: '',
        humidity: '',
        speed: ''
      },
      placeName: ''
    }
    this.apiToken = '45306d89154760fae68c325814c55610'
  }

  async getData (id) {
    const getJSON = (uri, options) =>
      window
        .fetch(uri, options)
        .then(res => res.json())
        .then(json => ({
          weather: json.weather[0].description,
          icon: json.weather[0].icon,
          temperature: json.main.temp,
          temperature_max: json.main.temp_max,
          temperature_min: json.main.temp_min,
          humidity: json.main.humidity,
          speed: json.wind.speed
        }))

    const options = { method: 'get' }
    const uri =
      'https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric'
    const params = `&appid=${this.apiToken}&id=${id}`
    const data = await getJSON(uri + params, options)
    this.setState({ item: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const place = this.state.data[index]
    this.getData(place.id)
    this.setState({ placeName: place.name })
  }

  componentDidMount () {
    this.setState({
      data: [
        { name: 'ニューヨーク', id: 5128581 },
        { name: '東京', id: 1850147 },
        { name: '上海', id: 1796236 },
        { name: 'カイロ', id: 360630 },
        { name: 'パリ', id: 2988507 },
        { name: '沖縄', id: 1854345 },
        { name: 'ブラジリア', id: 3469058 },
        { name: 'サンフランシスコ', id: 3837675 },
        { name: 'ロサンゼルス', id: 5368361 },
        { name: 'カリフォルニアシティ', id: 5332748 },
        { name: 'ベルリン', id: 2950159 },
        { name: 'バルセロナ', id: 3128760 },
        { name: 'リオデジャネイロ', id: 3451190 },
        { name: 'サンパウロ', id: 3448439 },
        { name: 'サンティアゴ', id: 3871336 },
        { name: 'バンクーバー', id: 6173331 },
        { name: 'ヒューストン', id: 4699066 },
        { name: 'シアトル', id: 5809844 },
        { name: 'フェニックス', id: 5308655 },
        { name: 'カンザスシティ', id: 4393217 },
        { name: 'シカゴ', id: 4887398 },
        { name: 'コロンビア', id: 4381982 },
        { name: 'リンカーン', id: 5072006 },
        { name: 'アラル', id: 1529641 },
        { name: 'ロンドン', id: 2643741 }
      ]
    })
  }

  render () {
    console.log(this.state)
    return (
      <Card>
        <div class='Card'>
          <CardHeader title='世界の天気予報' />
        </div>
        <CardActions>
          <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.name}
    renderInput={params => (
      <TextField
        {...params}
        label='選択'
        variant='outlined'
        style={{ width: 400 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const {
    weather,
    icon,
    temperature,
    temperature_max,
    temperature_min,
    humidity,
    speed
  } = props.item
  const formatTemperature = temperature ? `${temperature}℃` : ''
  const formatTemperature_max = temperature_max ? `${temperature_max}℃` : ''
  const formatTemperature_min = temperature_min ? `${temperature_min}℃` : ''
  const formatHumidity = humidity ? `${humidity}%` : ''
  const formatSpeed = speed ? `${speed}m/s` : ''
  const path = `http://openweathermap.org/img/wn/${icon}.png`
  const image = icon ? <Avatar src={path} alt={weather} /> : <WbSunny />
  console.log('props', props)
  return (
    <List>
      <div class='data'>
        <ListItem>
          <ListItemIcon>{image}</ListItemIcon>
          <ListItemText primary={weather} />
          天気
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary={formatTemperature} />
          気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BrightnessHigh />
          </ListItemIcon>
          <ListItemText primary={formatTemperature_max} />
          最高気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Brightness5 />
          </ListItemIcon>
          <ListItemText primary={formatTemperature_min} />
          最低気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Whatshot />
          </ListItemIcon>
          <ListItemText primary={formatHumidity} />
          湿度
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Waves />
          </ListItemIcon>
          <ListItemText primary={formatSpeed} />
          風速
        </ListItem>
      </div>
    </List>
  )
}

export default App
