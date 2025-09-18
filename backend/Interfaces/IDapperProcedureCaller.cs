namespace backend.Interfaces;

public interface IDapperProcedureCaller
{
    Task<bool> ExecuteBoolAsync(string procedureName, object parameters);
}

