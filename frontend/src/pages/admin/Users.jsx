import { useEffect, useState } from "react";

import { getUsers } from "../../api/admin.api";

import { useNavigate } from "react-router-dom";

function Users() {
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		total: 0,
		page: 1,
		limit: 5,
		totalPages: 1,
	});

	useEffect(() => {
		fetchUsers();
	}, [search, sortBy, sortOrder, page]);

  const fetchUsers = async () => {
    try {
			const response = await getUsers({
				page,
				limit,
				search,
				sortBy,
				sortOrder,
			});

      setUsers(response.data.data.users);
			setPagination(response.data.data.pagination);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch users."
      );
    }
  };

	const styles = {
		th: {
			textAlign: "left",
			padding: "12px",
			borderBottom: "1px solid #ddd",
		},

		td: {
			padding: "12px",
			borderBottom: "1px solid #eee",
		},
	};

	return (
		<div>
			<h1>Users</h1>
			<div
				style={{
					marginTop: "20px",
					marginBottom: "20px",
				}}
			>
				<input
					type="text"
					placeholder="Search users..."
					value={search}
					onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
					style={{
						width: "350px",
						padding: "10px",
					}}
				/>
			</div>

			<div
				style={{
					display: "flex",
					gap: "10px",
					marginBottom: "20px",
				}}
			>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="name">Name</option>
					<option value="email">Email</option>
					<option value="address">Address</option>
					<option value="role">Role</option>
				</select>

				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value)}
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</select>
			</div>

			<table
				style={{
					width: "100%",
					marginTop: "20px",
					borderCollapse: "collapse",
					background: "#fff",
				}}
			>
				<thead>
					<tr style={{ background: "#f5f5f5" }}>
						<th style={styles.th}>Name</th>
						<th style={styles.th}>Email</th>
						<th style={styles.th}>Address</th>
						<th style={styles.th}>Role</th>
						<th style={styles.th}>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td style={styles.td}>{user.name}</td>
							<td style={styles.td}>{user.email}</td>
							<td style={styles.td}>{user.address}</td>
							<td style={styles.td}>{user.role}</td>

							<td style={styles.td}>
								<button
									onClick={() => navigate(`/admin/users/${user.id}`)}
								>
									View
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "20px",
				}}
			>
				<button
					disabled={page === 1}
					onClick={() => setPage((prev) => prev - 1)}
				>
					Previous
				</button>

				<span>
					Page {pagination.page} of {pagination.totalPages}
				</span>

				<button
					disabled={page === pagination.totalPages}
					onClick={() => setPage((prev) => prev + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
}



export default Users;