<template>

</template>

<script>
const host = 'http://localhost:9999';
const mediaHost = 'https:media.maixy.top';
const avatarDefault = '/wode/avatar-default.png'
const avatar = '/wode/avatar.png'
const mp4Image = '/wode/mp4.png'
const pdfImage = '/wode/pdf.png'
const carousel = [mediaHost + '/wode/carousel1.jpg',mediaHost + '/wode/carousel2.jpg', mediaHost + '/wode/carousel1.jpg', mediaHost + '/wode/carousel2.jpg']
const headers =  {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json;charset=UTF-8'
}
const fileHeaders =  {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data'
}
const indexPage = {
  lastValue: 0,
  size: 10,
  totalPage: 0,
  hasMore: false,
  page: 1,
  totalCount: 0
}
function getUser() {
  return JSON.parse(sessionStorage.getItem("user"))
}
function setUser(user) {
  sessionStorage.setItem("user",JSON.stringify(user))
}
export default {
  name: "Global",
  host,
  mediaHost,
  avatarDefault,
  avatar,
  mp4Image,
  pdfImage,
  carousel,
  headers,
  fileHeaders,
  indexPage,
  getUser,
  setUser
}
</script>

<style scoped>

</style>
