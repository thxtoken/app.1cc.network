import AboutPage from '@/pages/about'
import NotFound from '@/pages/errors/404'
import FaqPage from '@/pages/faq'
import HomePage from '@/pages/home'

type RouteType = {
  path: string
  component: React.FC<{}>
}

const routes: RouteType[] = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/user/:address',
    component: HomePage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/faq',
    component: FaqPage
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
