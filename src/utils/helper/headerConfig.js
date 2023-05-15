const HeaderConfig = (token = '') => {
  console.log('this:', token)
  if (!token)
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

export { HeaderConfig }
