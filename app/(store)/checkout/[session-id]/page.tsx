import { useEffect } from 'react'

const CheckoutResultPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  if (searchParams['success']) {
    console.log('Order placed! You will receive an email confirmation.')
  }

  if (searchParams['canceled']) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.'
    )
  }

  return <div>CheckoutResultPage</div>
}

export default CheckoutResultPage
