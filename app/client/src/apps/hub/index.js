import React from 'react'

import Card from './src/components/Card'
import Section from './src/components/Section'

import './src/sass/main.sass'

const App = props => {
  return (
    <div id='fermin_hub'>
      <Section title='Internal Applications' >
        <Card title='Notes' image={require(`./assets/pen.png`)} />
      </Section>
      <Section title='External Applications'>
        <Card title='Dashlane' href='https://www.dashlane.com/' color='linear-gradient(180deg,#005a7d,#007c97)' image={require('./assets/dashlane.png')} />
        <Card title='Mega.nz' href='https://mega.nz' color='#F0373A' image={require('./assets/mega.png')} />
        <Card title='Fiken' href='https://fiken.no/' color='#110751' image={require('./assets/fiken.svg')} />
        <Card title='Github' href='https://github.com/' color='#24292e' image={require('./assets/github.png')} />
        <Card title='One' href='https://www.one.com/no/' color='#74a345' image={require('./assets/one.com.png')} />
        <Card title='Microsoft' href='https://products.office.com/nb-no/compare-all-microsoft-office-products?tab=2&OCID=AID679471_OO_Hero_mscomrefreshhome' color='linear-gradient(left, grey, grey 30%, white 30%, white)' image={require('./assets/microsoft.png')} />
      </Section>
    </div>
  )
}

export default App
