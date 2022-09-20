import { Box, Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Stack width="100vw" height="100vh" bg="brand.background" align="center" justify="center">
      <Link href="/lexical">
        <Button>Lexical</Button>
      </Link>
      <Link href="/slate">
        <Button>Slate</Button>
      </Link>
    </Stack>
  )
}
