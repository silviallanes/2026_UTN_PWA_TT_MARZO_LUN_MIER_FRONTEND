import React, { useContext, useEffect } from 'react'
import { getWorkspaces } from '../../services/workspaceService'
import useRequest from '../../hooks/useRequest'
import { Link } from 'react-router'
import useWorkspaces from '../../hooks/useWorkspaces'
import { AuthContext } from '../../Context/AuthContext'

const HomeScreen = () => {

  const {response, loading, error, workspaces} = useWorkspaces()
  const {isLogged} = useContext(AuthContext)
 
  return (
    <div>

      <Link to={'/workspace/new'}>Crear espacio de trabajo</Link>
      {
        isLogged 
        ? <button>Cerrar sesion</button>
        : <button>Login</button>
      }
      <h1>Bienvenido, seleccione su espacio de trabajo</h1>
      {
        loading && <span>Cargando</span>
      }
      {
        !loading && workspaces && <div>
          {
          workspaces.length === 0
          ? <span>No hay espacios de trabajo</span>
          : workspaces.map(
            (workspace) => {
              return (
                <div key={workspace.workspace_id}>
                  <h2>{workspace.workspace_title}</h2>
                  <Link to={'/workspace/' + workspace.workspace_id}>Abrir espacio de trabajo</Link>
                </div>
              )
            }
          )}
        </div>
      }
    </div>
  )
}

export default HomeScreen