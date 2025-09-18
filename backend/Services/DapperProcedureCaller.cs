using backend.Interfaces;
using Dapper;
using System.Data;

namespace backend.Services;

public class DapperProcedureCaller : IDapperProcedureCaller
{
    private readonly DatabaseService _db;

    public DapperProcedureCaller(DatabaseService db)
    {
        _db = db;
    }

    public async Task<bool> ExecuteBoolAsync(string procedureName, object parameters)
    {
        using var conn = _db.CreateConnection();
        var result = await conn.ExecuteScalarAsync<int>(procedureName, parameters, commandType: CommandType.StoredProcedure);
        return result == 1;
    }
}
