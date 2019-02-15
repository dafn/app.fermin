import React from 'react'

import Card from './src/components/Card'
import Section from './src/components/Section'

import './src/sass/main.sass'

const App = props => {
  return (
    <div id='fermin_hub'>
      <Section title='Internal Applications' >
        <Card title='Notes' internal href='app/notes' background='#333333' color='white' image={require(`./assets/pen.png`)} />
      </Section>
      <Section title='External Applications'>
        <Card title='Dashlane' href='https://www.dashlane.com/' background='linear-gradient(180deg,#005a7d,#007c97)' color='white' image={require('./assets/dashlane.png')} />
        <Card title='Mega.nz' href='https://mega.nz' background='#F0373A' color='white' image={require('./assets/mega.png')} />
        <Card title='Fiken' href='https://fiken.no/' background='#110751' color='white' image={require('./assets/fiken.svg')} />
        <Card title='Github' href='https://github.com/' background='#24292e' color='white' image={require('./assets/github.png')} />
        <Card title='One' href='https://www.one.com/no/' background='#74a345' color='white' image={require('./assets/one.com.png')} />
        <Card title='Microsoft' href='https://products.office.com/nb-no/compare-all-microsoft-office-products?tab=2&OCID=AID679471_OO_Hero_mscomrefreshhome' image={require('./assets/microsoft.png')} />
      </Section>
    </div>
  )
}

export default App
