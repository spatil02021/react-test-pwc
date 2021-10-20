import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    margin: '2rem 0',
  },
})

const Item = props => {
  const classes = useStyles()

  const createMarkup = html => {
    return { __html: html }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          dangerouslySetInnerHTML={createMarkup(props.name)}
        />
        <Typography dangerouslySetInnerHTML={createMarkup(props.email)} />
        <Typography dangerouslySetInnerHTML={createMarkup(props.username)} />
        <Typography dangerouslySetInnerHTML={createMarkup(props.phone)} />
        <Typography dangerouslySetInnerHTML={createMarkup(props.website)} />
        <Typography dangerouslySetInnerHTML={createMarkup(props.suite+","+props.street+","+props.city+","+props.zipcode)} />
        <Typography dangerouslySetInnerHTML={createMarkup(props.companyName)} />
      </CardContent>
    </Card>
  )
}

export default Item
