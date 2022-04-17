import {useQuery} from 'react-query'
import {client} from './api-client.final'

function useListItems(user) {
  // 🐨 call useQuery to get the list item from the list-items endpoint
  // queryKey should be 'list-items'
  // queryFn should call the 'list-items' endpoint with the user's token
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client(`list-items`, {token: user.token}).then(data => data.listItems),
  })

  return listItems ?? []
}

function useListItem(user, bookId) {
  // invoke useListItems hook to return listItems here.
  const listItems = useListItems(user)
  // 🦉 NOTE: the backend doesn't support getting a single list-item by it's ID
  // and instead expects us to cache all the list items and look them up in our
  // cache. This works out because we're using react-query for caching!
  return listItems.find(li => li.bookId === bookId) ?? null
}

export {useListItems, useListItem}
